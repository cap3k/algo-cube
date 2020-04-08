import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

export interface BoxObject {
  index: number;
  position: [number, number, number];
  isBlocked: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  updateBox: (index: number) => void;
}

const Box: React.FC<BoxObject> = React.memo((props: BoxObject) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef(new THREE.Mesh());
  console.log("I am a box and rerendering", props.position);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [color, setColor] = useState("orange");
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  useEffect(() => {
    const getColor = (): void => {
      let color = "";
      if (props.isBlocked) {
        color = "hotpink";
      } else if (props.isStartNode) {
        color = "blue";
      } else if (props.isEndNode) {
        color = "green";
      } else if (hovered) {
        color = "red";
      } else {
        color = "orange";
      }
      setColor(color);
    };
    getColor();
  }, [hovered, props.isBlocked, props.isEndNode, props.isStartNode]);
  return (
    <mesh
      position={props.position}
      ref={mesh}
      scale={[0.5, 0.5, 0.5]}
      onClick={(e) => {
        console.log("clicked on box");
        props.updateBox(props.index);
      }}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
});
Box.displayName = "Box";
export default Box;

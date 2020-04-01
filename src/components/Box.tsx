import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Box = React.memo((props: any) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef(new THREE.Mesh());

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.5, 0.5, 0.5]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered || active ? "hotpink" : "orange"}
      />
    </mesh>
  );
});
Box.displayName = "Box";
export default Box;

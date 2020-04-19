import { BoxObject } from "./Box";

//Maybe put it in app.tsx
const getNeighboringNodes = (
  node: BoxObject,
  nodes: BoxObject[][]
): Array<BoxObject> => {
  const neighboringNodes = new Array<BoxObject>();

  for (let i = node.x - 1; i <= node.x + 1; i++) {
    if (i < nodes.length && i >= 0)
      for (let y = node.y - 1; y <= node.y + 1; y++) {
        if (y < nodes[i].length && y >= 0 && node !== nodes[i][y])
          neighboringNodes.push(nodes[i][y]);
      }
  }
  return neighboringNodes;
};

const renderPath = (currentNode: BoxObject | undefined) => {
  while (currentNode) {
    currentNode.isPath = true;
    currentNode = currentNode.parent;
  }
};

const getDistanceBetweenNodes = (nodeA: BoxObject, nodeB: BoxObject) => {
  const distX = Math.abs(nodeA.x - nodeB.x);
  const distY = Math.abs(nodeA.y - nodeB.y);

  if (distX > distY) {
    return distY * 14 + 10 * (distX - distY);
  } else {
    return distX * 14 + 10 * (distY - distX);
  }
};

export const pathFinder = (
  boxes: BoxObject[][],
  startNodeIndex: [number, number],
  endNodeIndex: [number, number],
  updateGrid: (boxes: BoxObject[][]) => void
): void => {
  console.log("I am in PathFinder");

  const startNode = boxes[startNodeIndex[0]][startNodeIndex[1]];
  const endNode = boxes[endNodeIndex[0]][endNodeIndex[1]];

  //Set of nodes to be evaluated
  const openSet = new Array<BoxObject>();

  //Set of nodes already evaluated
  const closedSet = new Set<BoxObject>();

  openSet.push(startNode);

  while (openSet.length > 0) {
    let currentNode = openSet[0];
    for (let i = 0; i < openSet.length; i++) {
      if (
        openSet[i].fCost() < currentNode.fCost() ||
        (openSet[i].fCost() === currentNode.fCost() &&
          openSet[i].hCost < currentNode.hCost)
      ) {
        currentNode = openSet[i];
      }
    }
    openSet.splice(
      openSet.findIndex(
        (node) => node.x === currentNode.x && node.y === currentNode.y
      ),
      1
    );

    closedSet.add(currentNode);

    if (currentNode === endNode) {
      renderPath(currentNode);
      updateGrid(boxes);
      break;
    }
    const neighboringNodes = getNeighboringNodes(currentNode, boxes);
    neighboringNodes.forEach((neighbor) => {
      if (!neighbor.isBlocked && !closedSet.has(neighbor)) {
        const newNeighborGCost =
          currentNode.gCost + getDistanceBetweenNodes(currentNode, neighbor);
        if (newNeighborGCost < neighbor.gCost || !openSet.includes(neighbor)) {
          neighbor.gCost = newNeighborGCost;
          neighbor.hCost = getDistanceBetweenNodes(endNode, neighbor);
          neighbor.parent = currentNode;
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    });
  }
};
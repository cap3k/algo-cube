import { BoxObject } from "../Box";
import {
  renderPath,
  getNeighboringNodes,
  getDistanceBetweenNodes,
} from "./HelperFunctions";

export const aStarSimpleArray = (
  boxes: BoxObject[][],
  startNode: BoxObject,
  endNode: BoxObject,
  updateGrid: (boxes: BoxObject[][]) => void,
  setOpenDialog: (bool: boolean) => void
): void => {
  console.log("I am in aStarSimpleArray");

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
      return;
    }
    const neighboringNodes = getNeighboringNodes(currentNode, boxes);
    neighboringNodes.forEach((neighbor) => {
      if (!neighbor.isBlocked && !closedSet.has(neighbor)) {
        const newNeighborGCost =
          currentNode.gCost + getDistanceBetweenNodes(currentNode, neighbor);
        if (newNeighborGCost < neighbor.gCost || !openSet.includes(neighbor)) {
          neighbor.gCost = newNeighborGCost;

          neighbor.parent = currentNode;
          if (!openSet.includes(neighbor)) {
            neighbor.hCost = getDistanceBetweenNodes(endNode, neighbor);
            openSet.push(neighbor);
          }
        }
      }
    });
  }
  setOpenDialog(true);
};

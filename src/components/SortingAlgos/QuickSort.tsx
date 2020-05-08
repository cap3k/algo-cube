import { BoxObject } from "../Box";
export const quickSort = (
  boxArray: BoxObject[],
  setBoxArray: (boxArray: BoxObject[]) => void
): void => {
  console.log("quickSort");

  function placePivotInFinalPosition(
    boxArray: BoxObject[],
    startIndex: number,
    endIndex: number
  ): number {
    //swap function
    function swap(iA: number, iB: number, boxArray: BoxObject[]): void {
      const temp = boxArray[iA];
      boxArray[iA] = boxArray[iB];
      boxArray[iB] = temp;
    }
    //in this version, the last element is the pivot
    const pivot = boxArray[endIndex].number;
    //this keeps track of the frontier of the smaller elements
    //it starts at startIndex-1 because it is always incremented
    let lastSmallerThanPivot = startIndex - 1;
    for (let i = startIndex; i < endIndex; i++) {
      if (pivot > boxArray[i].number) {
        //the frontier is moved rightwards so a smaller element can replace the bigger element
        lastSmallerThanPivot++;
        swap(i, lastSmallerThanPivot, boxArray);
      }
    }
    //the pivot is swapped with first bigger element
    swap(endIndex, lastSmallerThanPivot + 1, boxArray);

    return lastSmallerThanPivot + 1;
  }

  function quickSort(
    boxArray: BoxObject[],
    startIndex: number,
    endIndex: number
  ): void {
    if (startIndex < endIndex) {
      //we place the pivot element at it's final resting place
      const pivotIndex = placePivotInFinalPosition(
        boxArray,
        startIndex,
        endIndex
      );
      // we keep sorting both sub-arrays, at the right and left of the last pivot
      quickSort(boxArray, startIndex, pivotIndex - 1);
      quickSort(boxArray, pivotIndex + 1, endIndex);
    }
  }
  //we start sort the whole array
  quickSort(boxArray, 0, boxArray.length - 1);
  setBoxArray(boxArray);
};

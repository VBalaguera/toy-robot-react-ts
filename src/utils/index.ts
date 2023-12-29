import { Command } from '../store/game-slice'

// all board's squares' positions
const allBlockedSquares = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
]

// compares two arrays of numbers,
// returns boolean
function compareArrays(
  array1: Array<number>[],
  array2: Array<number>[]
): boolean {
  return array1.length === array2.length
}

// checks if array of arrays contains array,
// returns boolean
function checkIfArrayContainsArray(
  array1: Array<number>[],
  array2: Array<number>
): boolean {
  return array1.some(
    (innerArray) =>
      innerArray.length === array2.length &&
      innerArray.every((value, index) => value === array2[index])
  )
}

// checks if array is
// already presented in an array of arrays
// in its last position
function checkLastArray(
  arrayOfArrays: Command[],
  newArray: Command
): Command[] | void {
  if (arrayOfArrays.length > 0) {
    const lastArray = arrayOfArrays[arrayOfArrays.length - 1]
    const areValuesEqual = lastArray.every(
      (value, index) => value === newArray[index]
    )
    if (areValuesEqual) return
  }
  arrayOfArrays.push(newArray)
  return arrayOfArrays
}

export {
  compareArrays,
  allBlockedSquares,
  checkIfArrayContainsArray,
  checkLastArray,
}

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
function compareArrays(array1: Array<number>[], array2: Array<number>[]) {
  if (array1.length === array2.length) return true
}

function checkIfArrayContainsArray(
  array1: Array<number>[],
  array2: Array<number>
) {
  if (
    array1.some(
      (innerArray) =>
        innerArray.length === array2.length &&
        innerArray.every((value, index) => value === array2[index])
    )
  )
    return true
}

export { compareArrays, allBlockedSquares, checkIfArrayContainsArray }

import { Dispatch } from '@reduxjs/toolkit'
import {
  Command,
  errorMessage,
  move,
  placeRobot,
  placeWall,
  report,
  resetGame,
  turnLeft,
  turnRight,
} from '../store/game-slice'

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

function processInput(text: FormDataEntryValue): string[] {
  const processedInput = String(text).toUpperCase()
  const commands = processedInput.split(/[,\s]+/)
  return commands
}

// submit game form
function submitForm(
  dispatch: Dispatch,
  hasRobot: boolean,
  commands: string[]
): void {
  if (!hasRobot) {
    switch (commands[0]) {
      case 'PLACE_ROBOT':
        // TODO: additional checks for command length?
        dispatch(
          placeRobot({
            xLocation: +commands[1],
            yLocation: +commands[2],
            direction: commands[3],
            hasRobot: true,
          })
        )
        break
      // PLACE_WALL
      case 'PLACE_WALL':
        // TODO: additional checks for command length
        dispatch(
          placeWall({
            yLocation: +commands[1],
            xLocation: +commands[2],
          })
        )
        break
      // TURN, REPORT, MOVE
      case 'LEFT':
      case 'RIGHT':
      case 'REPORT':
      case 'MOVE':
        {
          dispatch(
            errorMessage(
              'Command not supported yet. You need to place a robot first!'
            )
          )
        }
        break
      // EXPERIMENTAL
      case 'RESET':
        dispatch(resetGame())
        break
      default:
        dispatch(errorMessage('Command not recognized'))
    }
  } else {
    switch (commands[0]) {
      // PLACE_ROBOT
      case 'PLACE_ROBOT':
        dispatch(
          placeRobot({
            yLocation: +commands[1],
            xLocation: +commands[2],
            direction: commands[3],
            hasRobot: true,
          })
        )
        break
      //   PLACE_WALL
      case 'PLACE_WALL':
        dispatch(
          placeWall({
            yLocation: +commands[1],
            xLocation: +commands[2],
          })
        )
        break
      // TURN
      case 'LEFT':
        dispatch(turnLeft())
        break
      case 'RIGHT':
        dispatch(turnRight())
        break
      //   REPORT
      case 'REPORT':
        dispatch(report())
        break
      // MOVE
      case 'MOVE':
        dispatch(move())
        break
      // EXPERIMENTAL
      case 'RESET':
        dispatch(resetGame())
        break
      default:
        dispatch(errorMessage('Command not recognized'))
    }
  }
}

export {
  compareArrays,
  allBlockedSquares,
  checkIfArrayContainsArray,
  checkLastArray,
  processInput,
  submitForm,
}

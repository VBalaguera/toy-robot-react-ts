import { PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../store/game-slice'
import { checkIfArrayContainsArray } from '../utils'
// checkLastArray

// PLACE_ROBOT:
function placeRobotOnBoard(
  state: Game,
  action: PayloadAction<{
    xLocation: number
    yLocation: number
    direction: string
    hasRobot?: boolean
  }>
) {
  const coordinates = [action.payload.xLocation, action.payload.yLocation]
  const alreadyBlocked = checkIfArrayContainsArray(
    state.blockedSquares,
    coordinates
  )
  if (alreadyBlocked) {
    state.error = 'Already blocked'
  } else if (
    action.payload.xLocation > 5 ||
    action.payload.xLocation < 0 ||
    action.payload.yLocation > 5 ||
    action.payload.yLocation < 0
  ) {
    state.error =
      'Invalid coordinates. Please enter valid coordinates: [1 to 5, 1 to 5]'
  } else if (!action.payload.direction) {
    state.error = 'Please enter a direction'
  } else if (
    action.payload.direction === 'WEST' ||
    action.payload.direction === 'SOUTH' ||
    action.payload.direction === 'EAST' ||
    action.payload.direction === 'NORTH'
  ) {
    return {
      ...state,
      xLocation: action.payload.xLocation,
      yLocation: action.payload.yLocation,
      direction: action.payload.direction,
      hasRobot: true,
    }
  } else {
    state.error = 'Please enter a valid direction'
  }
}

// PLACE_WALL
function placeWallOnBoard(
  state: Game,
  action: PayloadAction<{
    yLocation: number
    xLocation: number
  }>
) {
  const coordinates = [action.payload.yLocation, action.payload.xLocation]
  const alreadyBlocked = checkIfArrayContainsArray(
    state.blockedSquares,
    coordinates
  )
  if (alreadyBlocked) {
    state.error = 'Already blocked'
  } else if (
    state.yLocation === action.payload.yLocation &&
    state.xLocation === action.payload.xLocation
  ) {
    state.error = 'There is a robot already there!'
  } else if (
    action.payload.yLocation > 5 ||
    action.payload.yLocation < 0 ||
    action.payload.xLocation > 5 ||
    action.payload.xLocation < 0
  ) {
    state.error =
      'Invalid coordinates. Please enter valid coordinates: [1 to 5, 1 to 5]'
  } else {
    state.blockedSquares.push([
      action.payload.yLocation,
      action.payload.xLocation,
    ])
  }
}

// TURN LEFT/RIGHT
function turnRobotLeft(state: Game) {
  if (!state.hasRobot) {
    state.error = 'Please place a robot first!'
  }
  switch (state.direction) {
    case 'NORTH':
      state.direction = 'WEST'
      break
    case 'WEST':
      state.direction = 'SOUTH'
      break
    case 'SOUTH':
      state.direction = 'EAST'
      break
    case 'EAST':
      state.direction = 'NORTH'
      break
    default:
      return
  }
}

function turnRobotRight(state: Game) {
  if (!state.hasRobot) {
    state.error = 'Please place a robot first!'
  }
  switch (state.direction) {
    case 'NORTH':
      state.direction = 'EAST'
      break
    case 'EAST':
      state.direction = 'SOUTH'
      break
    case 'SOUTH':
      state.direction = 'WEST'
      break
    case 'WEST':
      state.direction = 'NORTH'
      break
    default:
      return
  }
}
// MOVE
function moveRobot(state: Game) {
  let coordinates: number[]
  let alreadyBlocked: boolean
  // if no robot, ignore command
  if (!state.hasRobot) {
    state.error = 'Please place a robot first!'
  } else if (state.yLocation !== undefined && state.xLocation !== undefined) {
    switch (state.direction) {
      case 'NORTH':
        if (state.yLocation === 5) {
          coordinates = [state.xLocation, 1]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation = 1
        } else {
          coordinates = [state.xLocation, state.yLocation + 1]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation++
        }
        break
      case 'WEST':
        {
          if (state.xLocation === 1) {
            coordinates = [5, state.yLocation]
            alreadyBlocked = checkIfArrayContainsArray(
              state.blockedSquares,
              coordinates
            )
            if (alreadyBlocked) {
              state.error = 'Already blocked'
              return
            }
            state.xLocation = 5
          } else {
            coordinates = [state.xLocation - 1, state.yLocation]
            alreadyBlocked = checkIfArrayContainsArray(
              state.blockedSquares,
              coordinates
            )
            if (alreadyBlocked) {
              state.error = 'Already blocked'
              return
            }
            state.xLocation--
          }
        }
        break
      case 'SOUTH':
        if (state.yLocation === 1) {
          coordinates = [state.xLocation, 5]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation = 5
        } else {
          coordinates = [state.xLocation, state.yLocation - 1]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation--
        }
        break
      case 'EAST':
        if (state.xLocation === 5) {
          coordinates = [1, state.yLocation]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.xLocation = 1
        } else {
          coordinates = [state.xLocation + 1, state.yLocation]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.xLocation++
        }
        break
    }
  } else return
}

// REPORT
function reportRobot(state: Game) {
  if (!state.hasRobot) return
  if (state.yLocation === undefined || state.xLocation === undefined) return

  state.report = [state.xLocation, state.yLocation, state.direction]

  // state.commandsLog = [
  //   [state.xLocation + 1, state.yLocation + 1, state.direction],
  // ]

  // checkLastArray(state.commandsLog, [
  //   state.yLocation + 1,
  //   state.xLocation + 1,
  //   state.direction,
  // ])
}
// ADDITIONAL COMMANDS
// RESET GAME:
function resetRobotGame(state: Game) {
  state.yLocation = undefined
  state.xLocation = undefined
  state.direction = undefined
  state.hasRobot = false
  state.error = undefined
  state.blockedSquares = []
  state.commandsLog = []
}
// ERROR
function addErrorMessage(state: Game, action: PayloadAction<string>) {
  state.error = action.payload
}
// GAME OVER
function gameOver(state: Game) {
  state.isGameOver = true
  state.error =
    "All the walls are covered! The robot wanted to play today, but you didn't allowed it to! Game Over."
}
export {
  placeRobotOnBoard,
  placeWallOnBoard,
  turnRobotLeft,
  turnRobotRight,
  moveRobot,
  reportRobot,
  resetRobotGame,
  addErrorMessage,
  gameOver,
}

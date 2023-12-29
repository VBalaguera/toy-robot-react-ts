import { PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../store/game-slice'
import { checkIfArrayContainsArray, checkLastArray } from '../utils'

// PLACE_ROBOT:
function placeRobotOnBoard(
  state: Game,
  action: PayloadAction<{
    yLocation: number
    xLocation: number
    direction: string
    hasRobot?: boolean
  }>
) {
  const coordinates = [
    action.payload.yLocation - 1,
    action.payload.xLocation - 1,
  ]
  const alreadyBlocked = checkIfArrayContainsArray(
    state.blockedSquares,
    coordinates
  )
  if (alreadyBlocked) {
    state.error = 'Already blocked'
  } else if (
    action.payload.yLocation > 5 ||
    action.payload.yLocation < 0 ||
    action.payload.xLocation > 5 ||
    action.payload.xLocation < 0
  ) {
    state.error =
      'Invalid coordinates. Please enter valid coordinates: [0 to 5, 0 to 5]'
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
      yLocation: action.payload.yLocation - 1,
      xLocation: action.payload.xLocation - 1,
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
  const coordinates = [
    action.payload.yLocation - 1,
    action.payload.xLocation - 1,
  ]
  const alreadyBlocked = checkIfArrayContainsArray(
    state.blockedSquares,
    coordinates
  )
  if (alreadyBlocked) {
    state.error = 'Already blocked'
  } else if (
    state.yLocation === action.payload.yLocation - 1 &&
    state.xLocation === action.payload.xLocation - 1
  ) {
    state.error = 'There is a robot already there!'
  } else if (
    action.payload.yLocation > 5 ||
    action.payload.yLocation < 0 ||
    action.payload.xLocation > 5 ||
    action.payload.xLocation < 0
  ) {
    state.error =
      'Invalid coordinates. Please enter valid coordinates: [0 to 5, 0 to 5]'
  } else {
    state.blockedSquares.push([
      action.payload.yLocation - 1,
      action.payload.xLocation - 1,
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
  // TODO: revisit this
  let coordinates: number[]
  let alreadyBlocked: boolean
  // if no robot, ignore command
  if (!state.hasRobot) {
    state.error = 'Please place a robot first!'
  } else if (state.yLocation !== undefined && state.xLocation !== undefined) {
    switch (state.direction) {
      case 'NORTH':
        console.log('north')

        if (state.yLocation === 4) {
          coordinates = [0, state.xLocation]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation = 0
        } else {
          coordinates = [state.yLocation + 1, state.xLocation]
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
        console.log('WEST')
        {
          if (state.xLocation === 0) {
            coordinates = [state.yLocation, 4]
            alreadyBlocked = checkIfArrayContainsArray(
              state.blockedSquares,
              coordinates
            )
            if (alreadyBlocked) {
              state.error = 'Already blocked'
              return
            }
            state.xLocation = 4
          } else {
            coordinates = [state.yLocation, state.xLocation - 1]
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
        console.log('south')
        if (state.yLocation === 0) {
          coordinates = [4, state.xLocation]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.yLocation = 4
        } else {
          coordinates = [state.yLocation - 1, state.xLocation]
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
        console.log('east')
        if (state.xLocation === 4) {
          coordinates = [state.yLocation, 0]
          alreadyBlocked = checkIfArrayContainsArray(
            state.blockedSquares,
            coordinates
          )
          if (alreadyBlocked) {
            state.error = 'Already blocked'
            return
          }
          state.xLocation = 0
        } else {
          coordinates = [state.yLocation, state.xLocation + 1]
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

function reportRobot(state: Game) {
  if (!state.hasRobot) return
  if (state.yLocation === undefined || state.xLocation === undefined) return

  checkLastArray(state.commandsLog, [
    state.xLocation + 1,
    state.xLocation + 1,
    state.direction,
  ])
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
export {
  placeRobotOnBoard,
  placeWallOnBoard,
  turnRobotLeft,
  turnRobotRight,
  moveRobot,
  reportRobot,
  resetRobotGame,
  addErrorMessage,
}

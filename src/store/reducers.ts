import { PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../store/game-slice'
import { checkIfArrayContainsArray } from '../utils'

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
    state.error = 'already blocked'
  } else if (
    state.yLocation === action.payload.yLocation - 1 &&
    state.xLocation === action.payload.xLocation - 1
  ) {
    state.error = 'there is a robot already there!'
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
export { placeRobotOnBoard, placeWallOnBoard }

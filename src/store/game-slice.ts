import { createSlice } from '@reduxjs/toolkit'

import {
  addErrorMessage,
  moveRobot,
  placeRobotOnBoard,
  placeWallOnBoard,
  reportRobot,
  resetRobotGame,
  turnRobotLeft,
  turnRobotRight,
} from './reducers'

export type BlockedSquare = [y: number, x: number]

export type Command = [
  y: number | undefined,
  x: number | undefined,
  direction: string | undefined
]

export type Game = {
  yLocation?: number
  xLocation?: number
  direction?: string
  hasRobot: boolean
  blockedSquares: BlockedSquare[]
  error?: string
  // TODO: return to commandsLog
  // in the near future
  commandsLog: Command[]
}

const initialState: Game = {
  yLocation: undefined,
  xLocation: undefined,
  direction: undefined,
  hasRobot: false,
  error: undefined,
  blockedSquares: [],
  commandsLog: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // PLACE_ROBOT
    placeRobot: placeRobotOnBoard,
    // PLACE_WALL
    placeWall: placeWallOnBoard,
    // TURN LEFT/RIGHT
    turnLeft: turnRobotLeft,
    turnRight: turnRobotRight,
    // MOVE
    move: moveRobot,
    // REPORT
    report: reportRobot,
    // ADDITIONAL COMMANDS
    // RESET GAME
    resetGame: resetRobotGame,
    // ERROR
    errorMessage: addErrorMessage,
  },
})

export const {
  turnLeft,
  turnRight,
  placeRobot,
  placeWall,
  move,
  report,
  resetGame,
  errorMessage,
} = gameSlice.actions

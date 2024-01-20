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
  x: number | undefined,
  y: number | undefined,
  direction: string | undefined
]
export type Report = [
  x: number | undefined,
  y: number | undefined,
  direction: string | undefined
]

export type Game = {
  xLocation?: number
  yLocation?: number
  direction?: string
  hasRobot: boolean
  blockedSquares: BlockedSquare[]
  error?: string
  report: Report
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
  report: [undefined, undefined, undefined],
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

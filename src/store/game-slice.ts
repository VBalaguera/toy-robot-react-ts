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
  gameOver,
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
  isGameOver: boolean
}

const initialState: Game = {
  yLocation: undefined,
  xLocation: undefined,
  direction: undefined,
  hasRobot: false,
  error: undefined,
  blockedSquares: [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
  ],
  report: [undefined, undefined, undefined],
  commandsLog: [],
  isGameOver: false,
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
    isGameOver: gameOver,
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
  isGameOver,
  errorMessage,
} = gameSlice.actions

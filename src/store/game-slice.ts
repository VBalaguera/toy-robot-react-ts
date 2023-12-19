import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type BlockedSquare = [y: number, x: number]

// TODO: revisit this, set initial state for direction, yLocation, and xLocation to undefined
export type Game = {
  direction: string
  yLocation: number
  xLocation: number
  hasRobot: boolean
  blockedSquares: BlockedSquare[]
}

const initialState: Game = {
  direction: 'NORTH',
  yLocation: 0,
  xLocation: 0,
  hasRobot: true,
  blockedSquares: [
    [1, 1],
    [1, 2],
    [2, 3],
  ],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // PLACE ROBOT:
    // MOVE PIECE LEFT/RIGHT
    movePiece(state, action: PayloadAction<string>) {
      state.direction = action.payload
    },
    // TESTING COMMANDS
    // SPAWN
    spawnRobot(state) {
      state.hasRobot = !state.hasRobot
    },
    // RESET GAME:
    resetGame(state) {
      state.direction = 'NORTH'
      state.yLocation = 0
      state.xLocation = 0
      state.hasRobot = false
      state.blockedSquares = []
    },
  },
})

export const { movePiece, spawnRobot, resetGame } = gameSlice.actions

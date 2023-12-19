import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type BlockedSquare = [y: number, x: number]

export type Command = string

// TODO: revisit this, set initial state for direction, yLocation, and xLocation to undefined
export type Game = {
  yLocation?: number
  xLocation?: number
  direction?: string
  hasRobot: boolean
  blockedSquares: BlockedSquare[]
  // TODO: return to commandsLog
  // in the near future
  commandsLog: []
}

const initialState: Game = {
  yLocation: undefined,
  xLocation: undefined,
  direction: undefined,
  hasRobot: false,
  blockedSquares: [
    // [1, 1],
    // [1, 2],
    // [2, 3],
  ],
  commandsLog: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // PLACE ROBOT:
    placeRobot(
      state,
      action: PayloadAction<{
        yLocation: number
        xLocation: number
        direction: string
        hasRobot?: boolean
      }>
    ) {
      state.direction = action.payload.direction
      state.xLocation = action.payload.xLocation
      state.yLocation = action.payload.yLocation
      state.hasRobot = true
      // TODO: this can be improved,
      // vastly
    },
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
      state.yLocation = undefined
      state.xLocation = undefined
      state.direction = undefined
      state.hasRobot = false
      state.blockedSquares = []
      state.commandsLog = []
    },
  },
})

export const { movePiece, placeRobot, spawnRobot, resetGame } =
  gameSlice.actions

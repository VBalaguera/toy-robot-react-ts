import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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
      const coordinates = [
        action.payload.yLocation - 1,
        action.payload.xLocation - 1,
      ]
      const alreadyBlocked = state.blockedSquares.some(
        (innerArray) =>
          innerArray.length === coordinates.length &&
          innerArray.every((value, index) => value === coordinates[index])
      )

      console.log(coordinates)
      console.log(alreadyBlocked)
      console.log(state.yLocation)
      console.log(state.yLocation)

      if (alreadyBlocked) {
        state.error = 'Already blocked'
      }
      state.direction = action.payload.direction
      state.xLocation = action.payload.xLocation - 1
      state.yLocation = action.payload.yLocation - 1
      state.hasRobot = true

      // TODO: this can be improved,
      // vastly
    },
    // PLACE WALL:
    placeWall(
      state,
      action: PayloadAction<{
        yLocation: number
        xLocation: number
      }>
    ) {
      // find if the set of coordinates
      // are within blockedSquares
      const coordinates = [
        action.payload.yLocation - 1,
        action.payload.xLocation - 1,
      ]
      const alreadyBlocked = state.blockedSquares.some(
        (innerArray) =>
          innerArray.length === coordinates.length &&
          innerArray.every((value, index) => value === coordinates[index])
      )

      console.log(coordinates)
      console.log(alreadyBlocked)
      console.log(state.yLocation)
      console.log(state.yLocation)

      if (alreadyBlocked) {
        console.log('already blocked')
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
    },
    // MOVE PIECE LEFT/RIGHT
    turnLeft(state) {
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
    },
    turnRight(state) {
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
    },
    // REPORT
    report(state) {
      state.commandsLog.push([
        state.xLocation,
        state.xLocation,
        state.direction,
      ])
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
      state.error = undefined
      state.blockedSquares = []
      state.commandsLog = []
    },
    // ERROR
    errorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const {
  turnLeft,
  turnRight,
  placeRobot,
  placeWall,
  report,
  spawnRobot,
  resetGame,
  errorMessage,
} = gameSlice.actions

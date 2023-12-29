import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { checkIfArrayContainsArray, checkLastArray } from '../utils'

import { placeRobotOnBoard, placeWallOnBoard } from './reducers'

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
    placeRobot: placeRobotOnBoard,
    // PLACE WALL:
    placeWall: placeWallOnBoard,
    // TURN PIECE LEFT/RIGHT
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
    // MOVE
    move(state) {
      // TODO: revisit this
      let coordinates: number[]
      let alreadyBlocked: boolean
      // if no robot, ignore command
      if (!state.hasRobot) {
        state.error = 'Please place a robot first!'
      } else if (
        state.yLocation !== undefined &&
        state.xLocation !== undefined
      ) {
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
    },
    // REPORT
    // TODO: REVISE THIS
    report(state) {
      if (!state.hasRobot) return
      if (state.yLocation === undefined || state.xLocation === undefined) return

      checkLastArray(state.commandsLog, [
        state.xLocation + 1,
        state.xLocation + 1,
        state.direction,
      ])
    },
    // TESTING COMMANDS
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
  move,
  report,
  resetGame,
  errorMessage,
} = gameSlice.actions

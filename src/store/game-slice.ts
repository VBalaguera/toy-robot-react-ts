import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { checkIfArrayContainsArray } from '../utils'

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
      }
      // else if (
      //   action.payload.direction !== 'WEST' ||
      //   action.payload.direction !== 'SOUTH' ||
      //   action.payload.direction !== 'EAST' ||
      //   action.payload.direction !== 'NORTH'
      // ) {
      //   state.error = 'Please enter a valid direction'
      // }
      else {
        console.log(
          'yLocation:',
          action.payload.yLocation - 1,
          'xLocation:',
          action.payload.xLocation - 1,
          'direction',
          action.payload.direction,
          'hasRobot',
          action.payload.hasRobot
        )
        return {
          ...state,
          yLocation: action.payload.yLocation - 1,
          xLocation: action.payload.xLocation - 1,
          direction: action.payload.direction,
          hasRobot: true,
        }
      }

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
      const coordinates = [
        action.payload.yLocation - 1,
        action.payload.xLocation - 1,
      ]
      const alreadyBlocked = checkIfArrayContainsArray(
        state.blockedSquares,
        coordinates
      )

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
      // let coordinates: number[]
      // let alreadyBlocked: boolean
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
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [0, state.xLocation]
              )
              if (alreadyBlocked) {
                state.error = 'Already blocked'
                return
              }
              state.yLocation = 0
            } else {
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [state.yLocation + 1, state.xLocation]
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
                const alreadyBlocked = checkIfArrayContainsArray(
                  state.blockedSquares,
                  [state.yLocation, 4]
                )
                if (alreadyBlocked) {
                  state.error = 'Already blocked'
                  return
                }
                state.xLocation = 4
              } else {
                const alreadyBlocked = checkIfArrayContainsArray(
                  state.blockedSquares,
                  [state.yLocation, state.xLocation - 1]
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
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [4, state.xLocation]
              )
              if (alreadyBlocked) {
                state.error = 'Already blocked'
                return
              }
              state.yLocation = 4
            } else {
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [state.yLocation - 1, state.xLocation]
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
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [state.yLocation, 0]
              )
              if (alreadyBlocked) {
                state.error = 'Already blocked'
                return
              }
              state.xLocation = 0
            } else {
              const alreadyBlocked = checkIfArrayContainsArray(
                state.blockedSquares,
                [state.yLocation, state.xLocation + 1]
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
      if (state.yLocation !== undefined && state.yLocation !== undefined) {
        state.commandsLog.push([
          state.xLocation + 1,
          state.xLocation + 1,
          state.direction,
        ])
      }
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
  move,
  report,
  spawnRobot,
  resetGame,
  errorMessage,
} = gameSlice.actions

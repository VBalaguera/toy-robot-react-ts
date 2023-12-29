import { useGameDispatch, useGameSelector } from '../store/hooks'
import {
  turnLeft,
  turnRight,
  placeRobot,
  placeWall,
  move,
  report,
  resetGame,
  errorMessage,
} from '../store/game-slice'

import { allBlockedSquares, compareArrays } from '../utils'

import Input from './Input'
import Button from './Button'
import { FormEvent, useState, useEffect } from 'react'

export default function Form() {
  const { hasRobot } = useGameSelector((state) => state.game)

  const [command, setCommand] = useState('')

  const dispatch = useGameDispatch()

  const blockedSquares = useGameSelector((state) => state.game.blockedSquares)
  const isBoardBlocked = compareArrays(allBlockedSquares, blockedSquares)

  useEffect(() => {
    if (isBoardBlocked) {
      dispatch(
        errorMessage(
          "All the walls are covered! The robot wanted to play today, but you didn't allowed it to! Game Over."
        )
      )
    }
  }, [dispatch, blockedSquares, isBoardBlocked])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: revisit this
    dispatch(errorMessage(''))
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    const processedInput = String(data.command).toUpperCase()
    const commands = processedInput.split(/[,\s]+/)

    if (!hasRobot) {
      switch (commands[0]) {
        case 'PLACE_ROBOT':
          // TODO: additional checks for command length?

          dispatch(
            placeRobot({
              yLocation: +commands[1],
              xLocation: +commands[2],
              direction: commands[3],
              hasRobot: true,
            })
          )

          break
        // PLACE_WALL
        case 'PLACE_WALL':
          // TODO: additional checks for command length
          dispatch(
            placeWall({
              yLocation: +commands[1],
              xLocation: +commands[2],
            })
          )
          break
        // TURN, REPORT, MOVE
        case 'LEFT':
        case 'RIGHT':
        case 'REPORT':
        case 'MOVE':
          {
            dispatch(
              errorMessage(
                'Command not supported yet. You need to place a robot first!'
              )
            )
          }
          break
        // EXPERIMENTAL
        case 'RESET':
          dispatch(resetGame())
          break
        default:
          dispatch(errorMessage('Command not recognized'))
      }
    } else {
      switch (commands[0]) {
        // PLACE_ROBOT
        case 'PLACE_ROBOT':
          dispatch(
            placeRobot({
              yLocation: +commands[1],
              xLocation: +commands[2],
              direction: commands[3],
              hasRobot: true,
            })
          )
          break
        //   PLACE_WALL
        case 'PLACE_WALL':
          dispatch(
            placeWall({
              yLocation: +commands[1],
              xLocation: +commands[2],
            })
          )
          break
        // TURN
        case 'LEFT':
          dispatch(turnLeft())
          break
        case 'RIGHT':
          dispatch(turnRight())
          break
        //   REPORT
        case 'REPORT':
          dispatch(report())
          break
        // MOVE
        case 'MOVE':
          dispatch(move())
          break
        // EXPERIMENTAL
        case 'RESET':
          dispatch(resetGame())
          break
        default:
          dispatch(errorMessage('Command not recognized'))
      }
    }
    setCommand('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          height: '100%',
        }}
      >
        <Input
          name='command'
          id='command'
          type='text'
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          required
        />
        <Button text='submit' disabled={isBoardBlocked} />
      </form>
    </div>
  )
}

import { useGameDispatch, useGameSelector } from '../store/hooks'
import {
  turnLeft,
  turnRight,
  placeRobot,
  placeWall,
  report,
  resetGame,
  errorMessage,
} from '../store/game-slice'

import { allBlockedSquares, compareArrays } from '../utils'

import Input from './Input'
import Button from './Button'
import { FormEvent, useState, useEffect } from 'react'
import Command from './Command'

export default function Form() {
  const { yLocation, xLocation, direction, hasRobot, error } = useGameSelector(
    (state) => state.game
  )

  const [command, setCommand] = useState('')

  const dispatch = useGameDispatch()

  const blockedSquares = useGameSelector((state) => state.game.blockedSquares)

  useEffect(() => {
    const isBoardBlocked = compareArrays(allBlockedSquares, blockedSquares)
    if (isBoardBlocked) {
      dispatch(
        errorMessage(
          "All the walls are covered! The robot wanted to play today, but you didn't allowed it to!"
        )
      )
    }
  }, [dispatch, blockedSquares])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const processedInput = String(data.command).toUpperCase()
    const commands = processedInput.split(/[,\s]+/)

    if (!hasRobot) {
      if (commands[0] === 'PLACE_ROBOT') {
        dispatch(
          placeRobot({
            yLocation: Number(commands[1]),
            xLocation: Number(commands[2]),
            direction: commands[3],
            hasRobot: true,
          })
        )
      } else if (commands[0] === 'PLACE_WALL') {
        dispatch(
          placeWall({
            yLocation: Number(commands[1]),
            xLocation: Number(commands[2]),
          })
        )
      } else if (
        commands[0] === 'LEFT' ||
        commands[0] === 'RIGHT' ||
        commands[0] === 'REPORT'
      ) {
        dispatch(
          errorMessage(
            'Command not supported. You need to place a robot first.'
          )
        )
      } else if (commands[0] === 'RESET') {
        dispatch(resetGame())
      } else {
        dispatch(errorMessage('Command not supported'))
      }
    } else {
      switch (commands[0]) {
        // PLACE_ROBOT
        case 'PLACE_ROBOT':
          dispatch(
            placeRobot({
              yLocation: Number(commands[1]),
              xLocation: Number(commands[2]),
              direction: commands[3],
            })
          )
          break
        //   PLACE_WALL
        case 'PLACE_WALL':
          dispatch(
            placeWall({
              yLocation: Number(commands[1]),
              xLocation: Number(commands[2]),
            })
          )
          break
        // MOVE
        case 'LEFT':
          dispatch(turnLeft())
          break
        case 'RIGHT':
          dispatch(turnRight())
          break
        //   REPORT
        case 'REPORT':
          console.log(`${yLocation},${xLocation},${direction}`)
          dispatch(report())
          break
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name='command'
          id='command'
          type='text'
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          required
        />

        <Button text='submit' />

        {error && <Command status='error' text={error} />}
      </form>
    </div>
  )
}

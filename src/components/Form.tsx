import { useGameDispatch, useGameSelector } from '../store/hooks'
import { movePiece, placeRobot } from '../store/game-slice'

import Input from './Input'
import Button from './Button'
import { FormEvent, useState } from 'react'

export default function Form() {
  const yLocation = useGameSelector((state) => state.game.yLocation)
  const xLocation = useGameSelector((state) => state.game.xLocation)
  const direction = useGameSelector((state) => state.game.direction)
  const hasRobot = useGameSelector((state) => state.game.hasRobot)

  const [command, setCommand] = useState('')

  const [error, setError] = useState('')

  const dispatch = useGameDispatch()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const processedInput = String(data.command).toUpperCase()
    const commands = processedInput.split(/[,\s]+/)

    console.log(yLocation, xLocation, direction, hasRobot)

    console.log(data.command)
    console.log(commands)

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
      } else {
        console.log('error')
        setError('please place a robot first')
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
        // MOVE
        case 'LEFT':
          switch (direction) {
            case 'NORTH':
              dispatch(movePiece('WEST'))
              break
            case 'WEST':
              dispatch(movePiece('SOUTH'))
              break
            case 'SOUTH':
              dispatch(movePiece('EAST'))
              break
            case 'EAST':
              dispatch(movePiece('NORTH'))
              break
            default:
              return
          }
          break
        case 'RIGHT':
          switch (direction) {
            case 'NORTH':
              dispatch(movePiece('EAST'))
              break
            case 'WEST':
              dispatch(movePiece('NORTH'))
              break
            case 'SOUTH':
              dispatch(movePiece('WEST'))
              break
            case 'EAST':
              dispatch(movePiece('SOUTH'))
              break
            default:
              return
          }
          break
        default:
          return
      }
      setError('')
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
        {error && <span>{error}</span>}
      </form>
    </div>
  )
}

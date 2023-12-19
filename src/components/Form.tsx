import { useGameDispatch, useGameSelector } from '../store/hooks'
import { movePiece } from '../store/game-slice'

import Input from './Input'
import Button from './Button'
import { FormEvent, useState } from 'react'

export default function Form() {
  const yLocation = useGameSelector((state) => state.game.yLocation)
  const xLocation = useGameSelector((state) => state.game.xLocation)
  const direction = useGameSelector((state) => state.game.direction)
  const hasRobot = useGameSelector((state) => state.game.hasRobot)

  const [command, setCommand] = useState('')

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
      console.log('error')
    } else {
      switch (commands[0]) {
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
      </form>
    </div>
  )
}

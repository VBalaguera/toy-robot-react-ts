import { FormEvent, useState } from 'react'
import { useGameDispatch, useGameSelector } from '../../../store/hooks'
import { errorMessage } from '../../../store/game-slice'

import { processInput, submitForm } from '../../../utils'

import Input from '../../ui/Input'
import Button from '../../ui/Button'

export default function GameControlsInput() {
  const { hasRobot, isGameOver } = useGameSelector((state) => state.game)

  const [command, setCommand] = useState('')

  const dispatch = useGameDispatch()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    dispatch(errorMessage(''))
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    const commands = processInput(data.command)

    submitForm(dispatch, hasRobot, commands)

    setCommand('')
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form'>
        <Input
          name='command'
          id='command'
          data-testid='commandInputElement'
          type='text'
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          required
        />
        <Button text='submit' disabled={isGameOver} />
      </form>
    </div>
  )
}

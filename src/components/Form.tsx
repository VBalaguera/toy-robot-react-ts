import { useGameDispatch, useGameSelector } from '../store/hooks'
import { errorMessage } from '../store/game-slice'

import {
  allBlockedSquares,
  compareArrays,
  processInput,
  submitForm,
} from '../utils'

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

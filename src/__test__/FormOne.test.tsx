// 1,4,EAST test

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GameControlsInput from '../components/game/GameControls/GameControlsInput'
import { Provider } from 'react-redux'
import { store } from '../store/store'

import { enterInputClickButton } from '../utils/test-utils'

/*
First test data
PLACE_ROBOT 3,3,NORTH
PLACE_WALL 3,5
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT
# the app should print: 1,4,EAST
*/

test('1,4,EAST TEST', () => {
  render(
    <Provider store={store}>
      <GameControlsInput />
    </Provider>
  )

  const commandInputElement = screen.getByTestId('commandInputElement')
  const submitButtonElement = screen.getByRole('button')
  expect(commandInputElement).toBeInTheDocument()
  expect(submitButtonElement).toBeInTheDocument()

  // typing first instruction
  enterInputClickButton(
    commandInputElement,
    'PLACE_ROBOT 3,3,NORTH',
    submitButtonElement
  )

  // second instruction
  enterInputClickButton(
    commandInputElement,
    'PLACE_WALL 3,5',
    submitButtonElement
  )

  // third instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // fourth instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // fifth instruction
  enterInputClickButton(commandInputElement, 'RIGHT', submitButtonElement)

  // sixth instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // seventh instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // eigtht instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // ninth instruction
  enterInputClickButton(commandInputElement, 'REPORT', submitButtonElement)

  // final values
  expect(store.getState().game.xLocation).toBe(1)
  expect(store.getState().game.yLocation).toBe(4)
  expect(store.getState().game.direction).toBe('EAST')
  expect(store.getState().game.report).toStrictEqual([1, 4, 'EAST'])
  console.log(store.getState().game.report)
  console.log(store.getState().game.xLocation)
  console.log(store.getState().game.yLocation)
  console.log(store.getState().game.direction)
})

// 3,2,EAST test

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GameControlsInput from '../components/game/GameControls/GameControlsInput'
import { Provider } from 'react-redux'
import { store } from '../store/store'

import { enterInputClickButton } from '../utils/test-utils'

/*
PLACE_ROBOT 2,2,WEST
PLACE_WALL 1,1
PLACE_WALL 2,2
PLACE_WALL 1,3
LEFT
LEFT
MOVE
REPORT
# the app should print: 3,2,EAST
*/

test('3,2,EAST TEST', () => {
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
    'PLACE_ROBOT 2,2,WEST',
    submitButtonElement
  )

  // second instruction
  enterInputClickButton(
    commandInputElement,
    'PLACE_WALL 1,1',
    submitButtonElement
  )

  // third instruction
  enterInputClickButton(
    commandInputElement,
    'PLACE_WALL 2,2',
    submitButtonElement
  )

  // fourth instruction
  enterInputClickButton(
    commandInputElement,
    'PLACE_WALL 1,3',
    submitButtonElement
  )

  // fifth instruction
  enterInputClickButton(commandInputElement, 'LEFT', submitButtonElement)

  // sixth instruction
  enterInputClickButton(commandInputElement, 'LEFT', submitButtonElement)

  // seventh instruction
  enterInputClickButton(commandInputElement, 'MOVE', submitButtonElement)

  // eigtht instruction
  enterInputClickButton(commandInputElement, 'REPORT', submitButtonElement)

  // final values
  expect(store.getState().game.xLocation).toBe(3)
  expect(store.getState().game.yLocation).toBe(2)
  expect(store.getState().game.direction).toBe('EAST')
  expect(store.getState().game.report).toStrictEqual([3, 2, 'EAST'])
  console.log(store.getState().game.report)
  console.log(store.getState().game.xLocation)
  console.log(store.getState().game.yLocation)
  console.log(store.getState().game.direction)
})

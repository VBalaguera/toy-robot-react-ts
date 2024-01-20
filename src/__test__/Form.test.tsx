import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../components/Form'
import { Provider } from 'react-redux'
import { store } from '../store/store'

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

// helper for entering input
function enterInput(element: HTMLElement, input: string) {
  fireEvent.change(element, {
    target: { value: input },
  })
}

// helper for pressing Enter
// function pressEnter(element: HTMLElement) {
//   fireEvent.keyDown(element, {
//     key: 'Enter',
//     code: 'Enter',
//     charCode: 13,
//   })
// }

// helper for clicking Enter
function clickSubmitButton(button: HTMLElement) {
  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
}

test('1,4,EAST TEST', () => {
  render(
    <Provider store={store}>
      <Form />
    </Provider>
  )

  const commandInputElement = screen.getByTestId('commandInputElement')
  const submitButtonElement = screen.getByRole('button')
  expect(commandInputElement).toBeInTheDocument()
  expect(submitButtonElement).toBeInTheDocument()

  // typing first instruction
  enterInput(commandInputElement, 'PLACE_ROBOT 3,3,NORTH')
  clickSubmitButton(submitButtonElement)

  // second instruction
  enterInput(commandInputElement, 'PLACE_WALL 3,5')
  clickSubmitButton(submitButtonElement)

  // third instruction
  enterInput(commandInputElement, 'MOVE')
  clickSubmitButton(submitButtonElement)

  // fourth instruction
  enterInput(commandInputElement, 'MOVE')
  clickSubmitButton(submitButtonElement)

  // fifth instruction
  enterInput(commandInputElement, 'RIGHT')
  clickSubmitButton(submitButtonElement)

  // sixth instruction
  enterInput(commandInputElement, 'MOVE')
  clickSubmitButton(submitButtonElement)

  // seventh instruction
  enterInput(commandInputElement, 'MOVE')
  clickSubmitButton(submitButtonElement)

  // eight instruction
  enterInput(commandInputElement, 'MOVE')
  clickSubmitButton(submitButtonElement)

  // ninth instruction
  enterInput(commandInputElement, 'REPORT')
  clickSubmitButton(submitButtonElement)

  /*
  PLACE_WALL 3,5
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT
  */

  // this checks the outcome of the first two commands
  // expect(store.getState().game.hasRobot).toBe(true)
  // expect(store.getState().game.yLocation).toBe(2)
  // expect(store.getState().game.xLocation).toBe(2)
  // expect(store.getState().game.direction).toBe('NORTH')
  // expect(store.getState().game.blockedSquares).toStrictEqual([[2, 4]])

  // final values
  // adjusting values
  // NOTE: these are the given values
  expect(store.getState().game.yLocation).toBe(1)
  expect(store.getState().game.xLocation).toBe(4)
  expect(store.getState().game.direction).toBe('EAST')
})

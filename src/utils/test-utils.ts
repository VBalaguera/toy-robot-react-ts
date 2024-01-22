import { fireEvent } from '@testing-library/dom'

// helper for entering input
function enterInput(element: HTMLElement, input: string): void {
  fireEvent.change(element, {
    target: { value: input },
  })
}

// helper for pressing Enter
function pressEnter(element: HTMLElement): void {
  fireEvent.keyDown(element, {
    key: 'Enter',
    code: 'Enter',
    charCode: 13,
  })
}

// helper for clicking Enter
function clickSubmitButton(button: HTMLElement): void {
  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
}

// helper for enter input and click button
function enterInputClickButton(
  input: HTMLElement,
  text: string,
  button: HTMLElement
): void {
  enterInput(input, text)
  clickSubmitButton(button)
}

export { enterInput, pressEnter, clickSubmitButton, enterInputClickButton }

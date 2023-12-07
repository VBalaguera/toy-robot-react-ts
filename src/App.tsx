import Input from './components/Input'

import Board from './components/Board'

import Button from './components/Button'

import Piece from './components/Piece'

function App() {
  const handleClick = () => {
    console.log('click')
  }

  // placeholder for future reference
  // values will be passed directly with
  // ContextAPI
  const direction = 'north'

  // not in the job specs, but perhaps creating a MessageLog
  // // command
  // export type Command = {
  //   command: string
  // }
  // // log?
  // type Log = {
  //   log: Command[]
  // }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '1rem',
        }}
      >
        <h1>Toy robot game</h1>

        <Input id='command' />

        <Button text='click' onClick={handleClick} />

        <Board yPosition={1} xPosition={1}>
          <Piece direction={direction} />
        </Board>

        {/* <Message text='error message test' status='error' />
        <Message text='message test' />

        <Command text='command error test' status='error' />
        <Command text='command test' /> */}

        {/* <Piece image={robot} direction='north' />
        <Piece image={cat} direction='east' />
        <Piece image={spaceship} direction='west' />
        <Piece image={spaceship} direction='south' /> */}

        {/* <Log>
          <Command text='command error test' status='error' />
          <Command text='command test' />
        </Log> */}
      </div>
    </>
  )
}

export default App

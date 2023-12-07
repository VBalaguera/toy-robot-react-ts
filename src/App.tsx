import Input from './components/Input'

// import Command from './components/Command'
// import Piece from './components/Piece'
// import robot from './assets/robot-svgrepo-com.svg'
// import cat from './assets/Cat_silhouette.svg'
// import spaceship from './assets/spaceship-svgrepo-com.svg'
// import Message from './components/Message'
// import Log from './components/Log'
import Board from './components/Board'

import Button from './components/Button'

function App() {
  const handleClick = () => {
    console.log('click')
  }
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

        <Board />

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

import { useGameDispatch, useGameSelector } from '../store/hooks'
import {
  turnLeft,
  turnRight,
  spawnRobot,
  resetGame,
  report,
} from '../store/game-slice'

import Board from './Board'
import Button from './Button'

import Piece from './Piece'
import Form from './Form'
import CommandsLog from './CommandsLog'
import Container from './ui/Container'

function Game() {
  const yLocation = useGameSelector((state) => state.game.yLocation)
  const xLocation = useGameSelector((state) => state.game.xLocation)
  const direction = useGameSelector((state) => state.game.direction)
  const hasRobot = useGameSelector((state) => state.game.hasRobot)

  const dispatch = useGameDispatch()

  //   COMMANDS
  //   REPORT
  const handleReport = () => {
    console.log(`${yLocation},${xLocation},${direction}`)
    dispatch(report())
  }

  //   LEFT
  function handleMovePieceLeft() {
    dispatch(turnLeft())
  }
  function handleMovePieceRight() {
    dispatch(turnRight())
  }

  function handleSpawnRobot() {
    dispatch(spawnRobot())
  }

  function handleResetGame() {
    dispatch(resetGame())
  }

  // placeholder for future reference
  // values will be passed directly with
  // ContextAPI

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
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
          }}
        >
          <h1>Toy robot game</h1>

          <Board yLocation={yLocation} xLocation={xLocation}>
            <Piece direction={direction} />
          </Board>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '50%',
              height: 'auto',
            }}
          >
            <Form />

            <Button text='REPORT' onClick={handleReport} disabled={!hasRobot} />

            <Button
              text='TURN LEFT'
              onClick={handleMovePieceLeft}
              disabled={!hasRobot}
            />

            <Button
              text='TURN RIGHT'
              onClick={handleMovePieceRight}
              disabled={!hasRobot}
            />

            <Button
              text={`${hasRobot === true ? 'delete robot' : 'spawn robot'}`}
              onClick={handleSpawnRobot}
            />

            <Button text='reset game' onClick={handleResetGame} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              width: '50%',
              height: '100%',
            }}
          >
            <CommandsLog />
          </div>
        </div>

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
      </Container>
    </div>
  )
}
export default Game

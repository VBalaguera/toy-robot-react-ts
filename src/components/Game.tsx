import { useGameDispatch, useGameSelector } from '../store/hooks'
import { turnLeft, turnRight, spawnRobot, resetGame } from '../store/game-slice'

import Board from './Board'
import Button from './Button'

import Piece from './Piece'
import Form from './Form'
import CommandsLog from './CommandsLog'

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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '1rem',
          width: '1000px',
        }}
      >
        <h1>Toy robot game</h1>

        <Form />

        <Button text='REPORT' onClick={handleReport} />

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

        <Board yLocation={yLocation} xLocation={xLocation}>
          <Piece direction={direction} />
        </Board>

        <CommandsLog />

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
export default Game

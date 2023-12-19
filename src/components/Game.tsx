import { useGameDispatch, useGameSelector } from '../store/hooks'
import { movePiece, spawnRobot, resetGame } from '../store/game-slice'

import Input from './Input'
import Board from './Board'
import Button from './Button'

import Piece from './Piece'
import Form from './Form'

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
    switch (direction) {
      case 'NORTH':
        dispatch(movePiece('WEST'))
        break
      case 'WEST':
        dispatch(movePiece('SOUTH'))
        break
      case 'SOUTH':
        dispatch(movePiece('EAST'))
        break
      case 'EAST':
        dispatch(movePiece('NORTH'))
        break
      default:
        return
    }
  }
  function handleMovePieceRight() {
    console.log(direction)
    switch (direction) {
      case 'NORTH':
        dispatch(movePiece('EAST'))
        break
      case 'WEST':
        dispatch(movePiece('NORTH'))
        break
      case 'SOUTH':
        dispatch(movePiece('WEST'))
        break
      case 'EAST':
        dispatch(movePiece('SOUTH'))
        break
      default:
        return
    }
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
        }}
      >
        <h1>Toy robot game</h1>

        <Input id='command' />

        <Form />

        <Button text='REPORT' onClick={handleReport} />

        <Button
          text='MOVE LEFT'
          onClick={handleMovePieceLeft}
          disabled={!hasRobot}
        />

        <Button
          text='MOVE RIGHT'
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

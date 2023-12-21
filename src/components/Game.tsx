import { useGameDispatch, useGameSelector } from '../store/hooks'
import {
  turnLeft,
  turnRight,
  resetGame,
  errorMessage,
  move,
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
    dispatch(errorMessage(''))
    console.log(`${yLocation},${xLocation},${direction}`)
    dispatch(report())
  }

  //   LEFT
  function handleMovePieceLeft() {
    dispatch(errorMessage(''))
    dispatch(turnLeft())
  }
  function handleMovePieceRight() {
    dispatch(errorMessage(''))
    dispatch(turnRight())
  }

  function handleResetGame() {
    dispatch(errorMessage(''))
    dispatch(resetGame())
  }

  function handleMove() {
    dispatch(errorMessage(''))
    dispatch(move())
  }

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

            <Button text='MOVE' onClick={handleMove} disabled={!hasRobot} />

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

        {/* <Log>
          <Command text='command error test' status='error' />
          <Command text='command test' />
        </Log> */}
      </Container>
    </div>
  )
}
export default Game

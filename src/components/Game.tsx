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
import Command from './Command'

function Game() {
  const { yLocation, xLocation, direction, hasRobot, error } = useGameSelector(
    (state) => state.game
  )

  const dispatch = useGameDispatch()

  //   COMMANDS
  //   REPORT
  const handleReport = () => {
    dispatch(errorMessage(''))
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
    <div className='game'>
      <Container>
        <div className='game-container'>
          <h1>Toy robot game</h1>
          {error && <Command status='error'>{error}</Command>}

          <Board yLocation={yLocation} xLocation={xLocation}>
            <Piece direction={direction} />
          </Board>
        </div>

        <div className='game-controls'>
          <div className='game-controls-inputs'>
            <Form />

            <Button text='MOVE' onClick={handleMove} disabled={!hasRobot} />

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

            <Button text='reset game' onClick={handleResetGame} />
          </div>

          <div className='game-controls-logs'>
            <CommandsLog />
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Game

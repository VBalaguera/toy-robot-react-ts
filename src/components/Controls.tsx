import { useGameDispatch, useGameSelector } from '../store/hooks'
import {
  turnLeft,
  turnRight,
  resetGame,
  errorMessage,
  move,
  report,
} from '../store/game-slice'
import Button from './Button'
import Command from './Command'

export default function Controls() {
  const { hasRobot, yLocation, xLocation, direction, commandsLog } =
    useGameSelector((state) => state.game)

  const dispatch = useGameDispatch()
  //   COMMANDS
  //   REPORT
  const handleReport = () => {
    dispatch(errorMessage(''))
    dispatch(report())
    console.log(yLocation, xLocation, direction)
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
    <div className='controls'>
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

      <Command>
        {commandsLog[0]} {commandsLog[1]} {commandsLog[2]}
      </Command>

      {/* for testing */}
      <Button text='reset game' onClick={handleResetGame} />
    </div>
  )
}

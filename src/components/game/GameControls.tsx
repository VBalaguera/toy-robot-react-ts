import { useState } from 'react'
import { useGameDispatch, useGameSelector } from '../../store/hooks'
import {
  turnLeft,
  turnRight,
  resetGame,
  errorMessage,
  move,
  report,
} from '../../store/game-slice'

import Button from '../ui/Button'
import GameReport from './GameReport'
import GameError from './GameError'

export default function GameControls() {
  const {
    hasRobot,
    yLocation,
    xLocation,
    direction,
    report: reportRobot,
    error,
  } = useGameSelector((state) => state.game)

  const [showReport, setShowReport] = useState(false)

  const dispatch = useGameDispatch()
  //   COMMANDS
  //   REPORT
  const handleReport = () => {
    dispatch(errorMessage(''))
    dispatch(report())
    setShowReport(true)
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

      {/* for testing */}
      <Button text='reset game' onClick={handleResetGame} />

      {showReport && <GameReport report={reportRobot} />}
      {error && <GameError error={error} />}
    </div>
  )
}

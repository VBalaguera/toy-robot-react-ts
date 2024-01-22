import { useState } from 'react'
import { useGameDispatch, useGameSelector } from '../../../store/hooks'
import {
  turnLeft,
  turnRight,
  resetGame,
  errorMessage,
  move,
  report,
} from '../../../store/game-slice'

import Button from '../../ui/Button'
import GameReport from '../GameUI/GameReport'
import GameError from '../GameUI/GameError'

export default function GameControlsCommands() {
  const {
    hasRobot,
    report: reportRobot,
    error,
    isGameOver,
  } = useGameSelector((state) => state.game)

  const [showReport, setShowReport] = useState(false)

  const dispatch = useGameDispatch()
  //   COMMANDS
  //   REPORT
  const handleReport = () => {
    dispatch(errorMessage(''))
    dispatch(report())
    setShowReport(true)
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
    <div className='game-controls-controls'>
      <Button
        text='MOVE'
        onClick={handleMove}
        disabled={!hasRobot || isGameOver}
      />
      <Button
        text='REPORT'
        onClick={handleReport}
        disabled={!hasRobot || isGameOver}
      />

      <Button
        text='TURN LEFT'
        onClick={handleMovePieceLeft}
        disabled={!hasRobot || isGameOver}
      />

      <Button
        text='TURN RIGHT'
        onClick={handleMovePieceRight}
        disabled={!hasRobot || isGameOver}
      />

      {/* for testing */}
      <Button text='reset game' onClick={handleResetGame} />

      {showReport && <GameReport report={reportRobot} />}
      {error && <GameError error={error} />}
    </div>
  )
}

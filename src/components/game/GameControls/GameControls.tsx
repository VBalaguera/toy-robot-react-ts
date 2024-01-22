import { useEffect } from 'react'
import GameControlPanel from './GameControlsPanel'
import GameInstructions from '../GameUI/GameInstructions'
import { useGameDispatch, useGameSelector } from '../../../store/hooks'
import { allBlockedSquares, compareArrays } from '../../../utils'
import { isGameOver } from '../../../store/game-slice'

export default function GameControls() {
  const dispatch = useGameDispatch()

  const blockedSquares = useGameSelector((state) => state.game.blockedSquares)
  const isBoardBlocked = compareArrays(allBlockedSquares, blockedSquares)

  // checks if all the board's pieces are
  // occupied by walls
  // if true, triggers game over
  useEffect(() => {
    if (isBoardBlocked) {
      dispatch(isGameOver())
    }
  }, [dispatch, blockedSquares, isBoardBlocked])

  return (
    <div className='game-controls'>
      <GameControlPanel />
      <GameInstructions />
    </div>
  )
}

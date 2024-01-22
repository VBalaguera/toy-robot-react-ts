import { useGameSelector } from '../../../store/hooks'
import Board from '../../board/Board'
import Piece from '../../board/Piece'

export default function GameBoard() {
  const { yLocation, xLocation, direction } = useGameSelector(
    (state) => state.game
  )
  return (
    <div className='game-board'>
      <Board yLocation={yLocation} xLocation={xLocation}>
        <Piece direction={direction} />
      </Board>
    </div>
  )
}

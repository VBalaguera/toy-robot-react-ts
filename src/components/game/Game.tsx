import { useGameSelector } from '../../store/hooks'

import Board from '../board/Board'

import Piece from '../board/Piece'
import Container from '../ui/Container'

import GameControlPanel from './GameControlPanel'
import GameInstructions from './GameInstructions'

function Game() {
  const { yLocation, xLocation, direction } = useGameSelector(
    (state) => state.game
  )

  return (
    <>
      <Container>
        <div className='game-container'>
          <Board yLocation={yLocation} xLocation={xLocation}>
            <Piece direction={direction} />
          </Board>
        </div>

        <div className='game-controls'>
          <GameControlPanel />
          <GameInstructions />
        </div>
      </Container>
    </>
  )
}
export default Game

import { useGameSelector } from '../store/hooks'

import Board from './Board'

import Piece from './Piece'
import Container from './ui/Container'

import GameControls from './GameControls'
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
          <GameControls />
          <GameInstructions />
        </div>
      </Container>
    </>
  )
}
export default Game

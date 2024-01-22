import Container from '../ui/Container'
import GameContainer from './GameBoard/GameBoard'

import GameControls from './GameControls/GameControls'

function Game() {
  return (
    <>
      <Container>
        <GameContainer />
        <GameControls />
      </Container>
    </>
  )
}
export default Game

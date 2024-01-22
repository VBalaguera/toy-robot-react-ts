import GameControls from './GameControls'
import GameForm from './GameForm'

export default function GameControlPanel() {
  return (
    <div className='game-controls-inputs'>
      <GameForm />

      <GameControls />
    </div>
  )
}

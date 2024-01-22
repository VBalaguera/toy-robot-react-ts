import GameControlsCommands from './GameControlsCommands'
import GameControlsInput from './GameControlsInput'

export default function GameControlsPanel() {
  return (
    <div className='game-controls-inputs'>
      <GameControlsInput />
      <GameControlsCommands />
    </div>
  )
}

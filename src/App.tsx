import { Provider } from 'react-redux'
import { store } from './store/store'

import Game from './components/game/Game'
import GameHeading from './components/game/GameUI/GameHeading'

function App() {
  return (
    <>
      <Provider store={store}>
        <div className='app'>
          <GameHeading />
          <Game />
        </div>
      </Provider>
    </>
  )
}

export default App

import { Provider } from 'react-redux'
import { store } from './store/store'

import Game from './components/Game'
import Title from './components/Title'

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Title />
          <Game />
        </div>
      </Provider>
    </>
  )
}

export default App

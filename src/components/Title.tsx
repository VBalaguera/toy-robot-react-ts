import { useGameSelector } from '../store/hooks'
import Text from './Text'

export default function Title() {
  const { error } = useGameSelector((state) => state.game)
  return (
    <div style={{ height: '52px' }}>
      <Text type='title' text='Toy robot game' />
      {error && <Text type='error' text={error} />}
    </div>
  )
}

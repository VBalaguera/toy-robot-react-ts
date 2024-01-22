import Text from '../../ui/Text'

type GameErrorProps = {
  error: string
}

export default function GameError({ error }: GameErrorProps) {
  return <Text type='error' text={error} />
}

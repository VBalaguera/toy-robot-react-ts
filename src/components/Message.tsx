// displays individual messages

type MessageProps = {
  text: string
  status?: string
}

export default function Message({ text, status }: MessageProps) {
  return (
    <p className={`message ${status === 'error' ? 'error' : ''}`}>{text}</p>
  )
}

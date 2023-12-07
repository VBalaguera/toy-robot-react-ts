// displays individual commands
// styles vary depending on being an erroneous command or not

type CommandProps = {
  text: string
  status?: string
}

export default function Command({ text, status }: CommandProps) {
  return (
    <li className={`command ${status === 'error' ? 'error' : ''}`}>{text}</li>
  )
}

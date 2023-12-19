// displays all commands from user
import { useGameSelector } from '../store/hooks'
// import Command from './Command'

export default function CommandsLog() {
  const commandsLog = useGameSelector((state) => state.game.commandsLog)
  console.log(commandsLog)
  return (
    <div>
      {commandsLog.map((item, i) => (
        <div key={i}>
          <span>{item[0]}</span>
          <span>{item[1]}</span>
          <span>{item[2]}</span>
        </div>
        // <Command key={i} text={item[1]} />
      ))}
    </div>
  )
}

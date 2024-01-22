// // displays all commands from user
// import { useGameSelector } from '../../store/hooks'
// import Command from './Command'

// export default function CommandsLog() {
//   const commandsLog = useGameSelector((state) => state.game.commandsLog)
//   return (
//     <div className='commands-log'>
//       {commandsLog.map((item, i) => (
//         <div key={i}>
//           <Command>
//             <span>{item[0]}</span>
//             <span>{item[1]}</span>
//             <span>{item[2]}</span>
//           </Command>
//         </div>
//       ))}
//     </div>
//   )
// }

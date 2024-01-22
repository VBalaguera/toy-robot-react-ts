import { Report } from '../../store/game-slice'

type GameReportProps = {
  report: Report
}

export default function GameReport({ report }: GameReportProps) {
  return (
    <div className='game-report'>
      <span>REPORT:</span>
      <span>Row: {report[0]}</span>
      <span>Col: {report[1]}</span>
      <span>Dir: {report[2]}</span>
    </div>
  )
}

// as a container with children
// displays this game's piece
// for all purposes of this assignment
// it will be a robot

import robot from '../assets/robot-svgrepo-com.svg'

type PieceProps = {
  direction: string
}

export default function Piece({ direction }: PieceProps) {
  return <img className={`piece ${direction}`} src={robot} alt='piece' />
}

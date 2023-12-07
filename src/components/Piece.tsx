// as a container with children
// displays this game's piece
// for all purposes of this assignment
// it will be a robot
// but it could be anything we want to display

type PieceProps = {
  image: string
  direction: string
  x: number
  y: number
}

export default function Piece({ image, direction }: PieceProps) {
  return <img className={`piece ${direction}`} src={image} alt='piece' />
}

import { ReactNode } from 'react'

import { useGameSelector } from '../../store/hooks'

type SquareProps = {
  x: number
  y: number
  children?: ReactNode
}

export default function Square({ x, y, children }: SquareProps) {
  const coordinates = [x + 1, y + 1]

  const blockedSquares = useGameSelector((state) => state.game.blockedSquares)

  const blocked = blockedSquares.some(
    (innerArray) =>
      innerArray.length === coordinates.length &&
      innerArray.every((value, index) => value === coordinates[index])
  )

  return (
    <span className={`square ${blocked ? 'blocked' : ''}`}>
      <span>row: {x + 1};</span> <span>col: {y + 1}.</span>
      {children}
    </span>
  )
}

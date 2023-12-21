import { ReactNode } from 'react'

import { useGameSelector } from '../store/hooks'

type SquareProps = {
  x: number
  y: number
  children?: ReactNode
}

export default function Square({ x, y, children }: SquareProps) {
  const coordinates = [y, x]
  console.log('y:', y, 'x:', x)

  const blockedSquares = useGameSelector((state) => state.game.blockedSquares)

  const blocked = blockedSquares.some(
    (innerArray) =>
      innerArray.length === coordinates.length &&
      innerArray.every((value, index) => value === coordinates[index])
  )

  return (
    <span className={`square ${blocked ? 'blocked' : ''}`}>
      y: {y + 1}; x: {x + 1}
      {children}
    </span>
  )
}

import { ReactNode } from 'react'

type SquareProps = {
  x: number
  y: number
  children?: ReactNode
}

// placeholder for future reference
// values will be passed directly with
// ContextAPI
const blockedSquares = [
  [1, 1],
  [1, 2],
  [2, 3],
]

export default function Square({ x, y, children }: SquareProps) {
  const coordinates = [x, y]

  const blocked = blockedSquares.some(
    (innerArray) =>
      innerArray.length === coordinates.length &&
      innerArray.every((value, index) => value === coordinates[index])
  )

  return (
    <span className={`square ${blocked ? 'blocked' : ''}`}>
      x: {x}; y: {y}
      {children}
    </span>
  )
}

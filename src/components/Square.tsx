import { ReactNode } from 'react'

type SquareProps = {
  x?: number
  y?: number
  children?: ReactNode
  hasRobot?: boolean
}

// placeholder for future reference
// values will be passed directly with
// ContextAPI
const blockedSquares = [
  [1, 1],
  [1, 2],
  [2, 3],
]

export default function Square({ x, y, children, hasRobot }: SquareProps) {
  const coordinates = [x, y]
  console.log(hasRobot)

  const blocked = blockedSquares.some(
    (innerArray) =>
      innerArray.length === coordinates.length &&
      innerArray.every((value, index) => value === coordinates[index])
  )

  return (
    <span className={`square ${blocked ? 'blocked' : ''}`}>
      y: {y}
      x: {x}
      {children}
    </span>
  )
}

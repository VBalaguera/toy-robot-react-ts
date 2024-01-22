// display game's table

import { type ReactNode } from 'react'

import Square from './Square'

type BoardProps = {
  xLocation?: number
  yLocation?: number
  children?: ReactNode
}

export default function Board({ yLocation, xLocation, children }: BoardProps) {
  const rows = 5
  const columns = 5

  return (
    <div className='board-container'>
      <div className='board'>
        {/*  */}
        {Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: columns }, (_, colIndex) => (
            <Square
              key={rowIndex + 1 * colIndex + 1}
              x={rowIndex}
              y={colIndex}
            />
          ))
        )}
        {/* positions the piece */}
        <div
          className='board-piece'
          style={{
            top: `calc(72px * (${xLocation} - 1))`,
            left: `calc(72px * (${yLocation} - 1))`,
          }}
        >
          {xLocation !== undefined && yLocation !== undefined && children}
        </div>
      </div>
      {/* row */}
      <div className='board-down'>
        {Array.from({ length: 1 }, () =>
          Array.from({ length: 5 }, (_, rowIndex) => (
            <div key={rowIndex + 1}>{rowIndex + 1}</div>
          ))
        )}
      </div>
      {/* column */}
      <div className='board-right'>
        {Array.from({ length: 5 }, (_, colIndex) =>
          Array.from({ length: 1 }, () => (
            <div key={colIndex + 1}>{colIndex + 1}</div>
          ))
        )}
      </div>
      <div className='board-empty'>
        <div>TOY ROBOT GAME</div>
      </div>
    </div>
  )
}

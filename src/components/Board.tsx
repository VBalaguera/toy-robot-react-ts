// display game's table

import { type ReactNode } from 'react'

import Square from './Square'

type BoardProps = {
  yLocation?: number
  xLocation?: number
  children?: ReactNode
}

export default function Board({ yLocation, xLocation, children }: BoardProps) {
  const rows = 5
  const columns = 5

  return (
    <div className='board-container'>
      <div className='board'>
        {Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: columns }, (_, colIndex) => (
            <>
              <Square x={rowIndex} y={colIndex} />
            </>
          ))
        )}
        <div
          className='board-piece'
          style={{
            // using yLocation and xLocation
            // to position the piece
            // adjusting position by inverting both axis
            top: `calc(0px + 72px * ${xLocation})`,
            left: `calc(0px + 72px * ${yLocation})`,
          }}
        >
          {xLocation !== undefined && yLocation !== undefined && children}
        </div>
      </div>
      <div className='board-down'>
        {Array.from({ length: 1 }, () =>
          Array.from({ length: 5 }, (_, colIndex) => <div>{colIndex + 1}</div>)
        )}
      </div>
      <div className='board-right'>
        {Array.from({ length: 5 }, (_, rowIndex) =>
          Array.from({ length: 1 }, () => <div>{rowIndex + 1}</div>)
        )}
      </div>
      <div className='board-empty'>
        {/* TODO: improve this styling */}
        <div>TOY ROBOT GAME</div>
      </div>
    </div>
  )
}

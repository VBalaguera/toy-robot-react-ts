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
          style={{
            width: '72px',
            height: '72px',
            position: 'absolute',
            top: `calc(0px + 72px * ${xLocation})`,
            left: `calc(0px + 72px * ${yLocation})`,
            // adjusting position by inverting both axis
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        <div>TOY ROBOT GAME</div>
      </div>
    </div>
  )
}

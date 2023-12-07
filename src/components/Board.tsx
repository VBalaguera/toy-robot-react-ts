// display game's table
// receives as props coordinates
// and positions its children
// in this case, Piece.tsx

import { type ReactNode } from 'react'
import Square from './Square'

type BoardProps = {
  xPosition: number
  yPosition: number
  children: ReactNode
}

export default function Board({ xPosition, yPosition, children }: BoardProps) {
  const rows = 5
  const columns = 5

  // placeholder for future reference
  // values will be passed directly with
  // ContextAPI
  // const robotPosition = [xPosition, yPosition]
  console.log(children)

  return (
    <div className='board'>
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => (
          <>
            <Square x={colIndex} y={rowIndex} />
          </>
          // <>
          //   {robotPosition.every(
          //     (value, index) => value === [colIndex, rowIndex][index]
          //   ) ? (
          //     <Square x={colIndex} y={rowIndex}>
          //       {children}
          //     </Square>
          //   ) : (
          //     <Square x={colIndex} y={rowIndex} />
          //   )}
          // </>
        ))
      )}

      {/* approach 2: place here the Piece */}
      {/* x and y determine where it will be placed */}
      <div
        style={{
          width: '72px',
          height: '72px',
          position: 'absolute',
          top: `calc(0px + 72px * ${yPosition})`,
          left: `calc(0px + 72px * ${xPosition})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

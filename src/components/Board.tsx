// display game's table
// receives as props coordinates
// and positions its children
// in this case, Piece.tsx

import Square from './Square'

// import { type ReactNode } from 'react'

// type BoardProps = {
//   children: ReactNode
// }

export default function Board() {
  return (
    <div className='board'>
      {/* {children} */}
      {Array.from({ length: 25 }, (_, i) => (
        <Square key={i} />
      ))}
    </div>
  )
}

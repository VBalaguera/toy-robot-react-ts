// displays individual commands
// styles vary depending on being an erroneous command or not

import { type ReactNode } from 'react'

type CommandProps = {
  children: ReactNode
  status?: string
}

export default function Command({ status, children }: CommandProps) {
  return (
    <li className={`command ${status === 'error' ? 'error' : ''}`}>
      {children}
    </li>
  )
}

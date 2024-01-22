// displays all commands from user

import { type ReactNode } from 'react'

type LogProps = {
  children: ReactNode
}

export default function Log({ children }: LogProps) {
  return <ul className='log'>{children}</ul>
}

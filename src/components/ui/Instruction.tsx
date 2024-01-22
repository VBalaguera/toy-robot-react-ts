import { ReactNode } from 'react'

type InstructionProps = {
  children: ReactNode
}

export default function Instruction({ children }: InstructionProps) {
  return <div>{children}</div>
}

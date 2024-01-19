// receives user's inputs

import type { ComponentPropsWithoutRef } from 'react'

type InputProps = {
  id: string
} & ComponentPropsWithoutRef<'input'>

export default function Input({ id, ...props }: InputProps) {
  return (
    <div className='input'>
      <input className='input' id={id} {...props} />
    </div>
  )
}

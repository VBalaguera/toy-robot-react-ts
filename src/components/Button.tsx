import { ComponentPropsWithoutRef } from 'react'

type BaseProps = {
  text: string
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & BaseProps
export default function Button(props: ButtonProps) {
  const { text, ...otherProps } = props
  return (
    <button className='button' {...otherProps}>
      {text}
    </button>
  )
}

import { ComponentPropsWithoutRef } from 'react'

type SelectProps = {
  options: string[] | number[]
} & ComponentPropsWithoutRef<'select'>

export default function Select({ options }: SelectProps) {
  return (
    <select>
      {options.map((item, idx) => (
        <option key={idx}>{item}</option>
      ))}
    </select>
  )
}

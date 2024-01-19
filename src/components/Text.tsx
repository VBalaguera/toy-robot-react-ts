// displays individual messages

type TextProps = {
  text: string
  type?: string
}

export default function Text({ text, type }: TextProps) {
  return <p className={`text text-${type}`}>{text}</p>
}

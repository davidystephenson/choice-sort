import getRandomRange from './getRandomRange'

export default function getRandomElement <Element> (props: {
  seed: string
  array: Element[]
}): Element {
  const random = getRandomRange({
    maximum: props.array.length,
    seed: props.seed
  })
  const element = props.array[random]
  return element
}

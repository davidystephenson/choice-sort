import Rand from 'rand-seed'

export default function getRandom (props: {
  debug?: boolean
  seed: string
}): number {
  const rand = new Rand(props.seed)
  const random = rand.next()
  if (props.debug === true) {
    console.debug('random', random)
  }
  return random
}

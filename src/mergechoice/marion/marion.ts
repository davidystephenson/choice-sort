import { UnknownParts, Actors } from './marionTypes'

class AuditionError extends Error { }
const audition = <Complement, O, P extends UnknownParts, K extends keyof UnknownParts>(props: {
  actors: Actors<Complement, O, P>
  complement: Complement
  part: P
  key: K
}): O => {
  const input = props.part[props.key]
  if (input == null) {
    throw new AuditionError()
  }
  const actor = props.actors[props.key]
  const output = actor({ input, ...props.complement })
  return output
}

export const marion = <Complement, Output, P extends UnknownParts,>(props: {
  actors: Actors<Complement, Output, P>
  complement: Complement
  part: P
}): Output => {
  let key: keyof P
  for (key in props.actors) {
    try {
      const result = audition({
        actors: props.actors,
        complement: props.complement,
        part: props.part,
        key: key as keyof UnknownParts
      })
      return result
    } catch (error) {
      if (error instanceof AuditionError) {
        continue
      }
      throw error
    }
  }
  throw new Error('No match found')
}

import { Choice, Flow, getChoice } from '../../src'

export default function getVerifiedChoice (props: {
  flow: Flow
}): Choice {
  const choice = getChoice({ flow: props.flow })
  expect(choice).toBeDefined()
  if (choice == null) {
    throw new Error('Choice should be defined')
  }
  return choice
}

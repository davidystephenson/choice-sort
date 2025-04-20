import { Flow, chooseOption } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'

export default function chooseOptions (props: {
  flow: Flow
  queues: boolean[]
}): Flow {
  const chosen = props.queues.reduce((flow, queue) => {
    const choice = getVerifiedChoice({ flow })
    const itemUid = queue ? choice.queue : choice.catalog
    const chosenFlow = chooseOption({
      flow, option: itemUid
    })
    return chosenFlow
  }, props.flow)
  return chosen
}

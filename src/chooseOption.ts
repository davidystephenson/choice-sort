import { Flow } from './flowTypes'
import operate from './operate'
import combineOperations from './combineOperations'

export default function chooseOption (props: {
  flow: Flow
  option: string
}): Flow {
  const chosenFlow = operate({ flow: props.flow, option: props.option })
  const combinedFlow = combineOperations({ flow: chosenFlow })
  return combinedFlow
}

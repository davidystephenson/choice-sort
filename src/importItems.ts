import { Flow, Item } from './types'
import combineOperations from './combineOperations'
import populate from './populate'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  const populatedFlow = populate({ flow: props.flow, items: props.items })
  return combineOperations({ flow: populatedFlow })
}

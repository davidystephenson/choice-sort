import { Flow, OperationDef } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'

export default function insertOperation (props: {
  flow: Flow
} & OperationDef): Flow {
  const operation = createOperation({ ...props })
  const addedFlow = addOperation({ flow: props.flow, operation })
  return addedFlow
}

import { Flow, Operation } from './flowTypes'
import createOperation from './createOperation'
import addOperation from './addOperation'
import isOutputOperation from './isOutputOperation'

export default function combineOperations (props: {
  flow: Flow
}): Flow {
  const operations = Object.values(props.flow.operations)
  const outputOperations = operations.filter(operation => isOutputOperation({ operation }))

  if (outputOperations.length > 2) {
    throw new Error('Flow has more than two output operations')
  }

  if (outputOperations.length !== 2) {
    return props.flow
  }

  const [first, second] = outputOperations
  const firstLength = first.output.length
  const secondLength = second.output.length

  let catalogOperation
  let queueOperation

  if (firstLength === secondLength) {
    // If same length, earlier UID goes to catalog
    if (first.uid < second.uid) {
      catalogOperation = first
      queueOperation = second
    } else {
      catalogOperation = second
      queueOperation = first
    }
  } else {
    // If different length, longer goes to catalog
    if (firstLength > secondLength) {
      catalogOperation = first
      queueOperation = second
    } else {
      catalogOperation = second
      queueOperation = first
    }
  }

  const newOperation = createOperation({
    flow: props.flow,
    catalog: catalogOperation.output,
    queue: queueOperation.output,
    output: []
  })

  const operationsToKeep = Object.entries(props.flow.operations)
    .filter(([uid]) => uid !== first.uid && uid !== second.uid)
    .reduce<Record<string, Operation>>((acc, [uid, operation]) => {
    acc[uid] = operation
    return acc
  }, {})

  const flowWithoutOutputOperations = {
    ...props.flow,
    operations: operationsToKeep
  }

  return addOperation({
    flow: flowWithoutOutputOperations,
    operation: newOperation
  })
}

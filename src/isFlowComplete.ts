import { Flow } from './types'
import isOutputOperation from './isOutputOperation'

export default function isFlowComplete (props: {
  flow: Flow
}): boolean {
  const operations = Object.values(props.flow.operations)

  if (operations.length === 0) {
    return Object.keys(props.flow.items).length === 0
  }

  for (const operation of operations) {
    if ((operation.queue.length > 0 && operation.catalog.length === 0) ||
        (operation.queue.length === 0 && operation.catalog.length > 0)) {
      throw new Error('Operation has only one of the inputs')
    }
  }

  for (const operation of operations) {
    if (operation.queue.length === 0 && operation.catalog.length === 0 && operation.output.length === 0) {
      throw new Error('Operation has no inputs or outputs')
    }
  }

  const outputOperations = operations.filter(operation => isOutputOperation({ operation }))

  // if (outputOperations.length > 1) {
  //   throw new Error('Flow has multiple output operations')
  // }

  if (operations.length > 1) {
    return false
  }

  if (operations.length === 1 && outputOperations.length === 1) {
    return true
  }

  return false
}

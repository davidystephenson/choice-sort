import cloneOperation from './cloneOperation'
import { ItemId, OperationDictionary, RemovalFromOperations } from './mergeChoiceTypes'

export default function removeFromOperations (props: {
  itemId: ItemId
  operations: OperationDictionary
}): RemovalFromOperations {
  let emptiedOperationId: ItemId | undefined
  const entries = Object.entries(props.operations)
  const newEntries = entries.map((entry) => {
    const [id, operation] = entry
    const newOperation = cloneOperation({ operation })
    const inFirstInput = newOperation.input[0].includes(props.itemId)
    const inSecondInput = newOperation.input[1].includes(props.itemId)
    const inInput = inFirstInput || inSecondInput
    if (!inInput) {
      newOperation.output = newOperation.output.filter(existingId => existingId !== props.itemId)
      return [id, newOperation]
    }
    if (inFirstInput) {
      newOperation.input[0] = newOperation.input[0].filter(existingId => existingId !== props.itemId)
      if (newOperation.input[0].length === 0) {
        emptiedOperationId = operation.mergeChoiceId
        newOperation.output.push(...newOperation.input[1])
        newOperation.input[1] = []
      }
    }
    if (inSecondInput) {
      newOperation.input[1] = newOperation.input[1].filter(existingId => existingId !== props.itemId)
      if (newOperation.input[1].length === 0) {
        emptiedOperationId = operation.mergeChoiceId
        newOperation.output.push(...newOperation.input[0])
        newOperation.input[1] = []
      }
    }
    return [id, newOperation]
  })
  const newOperations = Object.fromEntries(newEntries)
  return {
    emptiedOperationId,
    operations: newOperations
  }
}

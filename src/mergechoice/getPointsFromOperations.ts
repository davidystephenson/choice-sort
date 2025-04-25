import { ItemId, OperationDictionary } from './mergeChoiceTypes'

export default function getPointsFromOperations (props: {
  itemId: ItemId
  operations: OperationDictionary
}): number {
  const values = Object.values(props.operations)
  for (const operation of values) {
    const input0 = operation.input[0].some(id => id === props.itemId)
    if (input0) {
      return operation.input[0].indexOf(props.itemId) + operation.output.length
    }
    const input1 = operation.input[1].some(id => id === props.itemId)
    if (input1) {
      return operation.input[1].indexOf(props.itemId) + operation.output.length
    }
    const output = operation.output.some(id => id === props.itemId)
    if (output) {
      return operation.output.indexOf(props.itemId)
    }
  }
  return NaN
}

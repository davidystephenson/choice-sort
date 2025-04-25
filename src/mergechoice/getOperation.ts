import { Operation, OperationDictionary } from './mergeChoiceTypes'

export default function getOperation (props: {
  operations: OperationDictionary
  operationId: number
}): Operation {
  const operation = props.operations[props.operationId]
  if (operation == null) {
    throw new Error(`There is no operation ${props.operationId}`)
  }
  return operation
}

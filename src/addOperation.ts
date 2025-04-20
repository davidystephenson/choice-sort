import { Flow, Operation } from './flowTypes'

export default function addOperation (props: {
  flow: Flow
  operation: Operation
}): Flow {
  if (props.flow == null) {
    throw new Error('Flow is required')
  }

  if (props.operation == null) {
    throw new Error('Operation is required')
  }

  if (props.flow.operations[props.operation.uid] != null) {
    throw new Error('Operation UID is not unique')
  }

  const operations = {
    ...props.flow.operations,
    [props.operation.uid]: props.operation
  }

  const operationCount = props.flow.count + 1

  return {
    ...props.flow,
    operations,
    count: operationCount
  }
}

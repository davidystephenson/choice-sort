import createUid from './createUid'
import { Flow, Operation, OperationDef } from './types'

export default function createOperation (props: {
  flow: Flow
} & OperationDef): Operation {
  if (
    props.queue == null ||
    props.catalog == null ||
    props.output == null
  ) {
    throw new Error('Operation definition is required')
  }

  const inputsEmpty = props.queue.length === 0 && props.catalog.length === 0
  const outputEmpty = props.output.length === 0
  const empty = inputsEmpty && outputEmpty
  if (empty) {
    throw new Error('Operation cannot be empty')
  }

  const aPresent = props.queue.length > 0
  const bPresent = props.catalog.length > 0
  const oneSided = aPresent !== bPresent
  if (oneSided) {
    throw new Error('Cannot have input on only one side')
  }

  if (props.queue.length > props.catalog.length) {
    throw new Error('queue cannot be longer than catalog')
  }

  const allUids = [...props.queue, ...props.catalog, ...props.output]
  const uniqueUids = new Set(allUids)
  const duplicate = allUids.length !== uniqueUids.size
  if (duplicate) {
    throw new Error('Duplicate UIDs in operation')
  }

  const uid = createUid({
    uid: props.flow.uid, count: props.flow.count
  })

  const operation: Operation = {
    better: undefined,
    catalog: props.catalog,
    queue: props.queue,
    output: props.output,
    uid
  }

  return operation
}

import { Operation } from './flowTypes'

export default function isInputOperation (props: {
  operation: Operation
}): boolean {
  const hasOutput = props.operation.output.length !== 0
  if (hasOutput) {
    return false
  }

  const hasAInputs = props.operation.queue.length !== 0
  const hasBInputs = props.operation.catalog.length !== 0
  const hasInputs = hasAInputs || hasBInputs
  if (!hasInputs) {
    return false
  }

  return true
}

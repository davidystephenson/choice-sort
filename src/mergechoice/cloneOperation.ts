import { Operation } from './mergeChoiceTypes'

export default function cloneOperation ({
  operation
}: {
  operation: Operation
}): Operation {
  const input = operation.input.map(input => [...input])
  const output = [...operation.output]
  const newOperation: Operation = {
    input,
    mergeChoiceId: operation.mergeChoiceId,
    output,
    priority: operation.priority
  }
  return newOperation
}

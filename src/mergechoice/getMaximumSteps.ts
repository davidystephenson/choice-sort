import { Operation } from './mergeChoiceTypes'

export default function getMaximumSteps ({ operation }: {
  operation: Operation
}): number {
  const maximum = operation.input[0].length + operation.input[1].length - 1
  return Math.max(0, maximum)
}

import { Operation } from './mergeChoiceTypes'

export default function getMinimumSteps ({ operation }: {
  operation: Operation
}): number {
  return Math.min(operation.input[0].length, operation.input[1].length)
}

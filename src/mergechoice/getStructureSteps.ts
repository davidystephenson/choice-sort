import sum from './sum'
import { CountRange } from './mergeChoiceTypes'

export default function getStructureSteps ({
  structure
}: {
  structure: number[][]
}): CountRange {
  const blocksMaximum = structure.map(operation => Math.max(0, operation[0] + operation[1] - 1))
  const blocksMininum = structure.map(operation => Math.min(operation[0], operation[1]))
  return {
    maximum: sum({ numbers: blocksMaximum }),
    minimum: sum({ numbers: blocksMininum })
  }
}

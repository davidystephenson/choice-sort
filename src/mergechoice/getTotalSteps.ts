import getNextStructure from './getNextStructure'
import getOperationStructure from './getOperationStructure'
import getStructureSteps from './getStructureSteps'
import { CountRange, OperationDictionary } from './mergeChoiceTypes'

export default function getTotalSteps ({ operations }: {
  operations: OperationDictionary
}): CountRange {
  let maximum = 0
  let minimum = 0
  let structure = getOperationStructure({ operations })
  let structureSteps = getStructureSteps({ structure })
  while (structureSteps.maximum > 0) {
    structureSteps = getStructureSteps({ structure })
    maximum += structureSteps.maximum
    minimum += structureSteps.minimum
    structure = getNextStructure({ structure })
    structureSteps = getStructureSteps({ structure })
  }
  return {
    maximum,
    minimum
  }
}

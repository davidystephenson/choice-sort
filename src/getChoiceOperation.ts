import { Flow, Operation } from './types'
import isFlowComplete from './isFlowComplete'
import getOptionIndex from './getOptionIndex'
import isOutputOperation from './isOutputOperation'

export default function getChoiceOperation (props: { flow: Flow }): Operation {
  const operations = Object.values(props.flow.operations)

  if (operations.length === 0) {
    throw new Error('Flow has no operations')
  }

  if (isFlowComplete({ flow: props.flow })) {
    throw new Error('Flow is complete')
  }

  // First check for non-output operations with option index 0
  const zeroIndexNonOutputOps = operations.filter(op =>
    !isOutputOperation({ operation: op }) &&
    getOptionIndex({ operation: op }) === 0
  )

  if (zeroIndexNonOutputOps.length > 0) {
    return zeroIndexNonOutputOps.reduce((earliest, current) =>
      current.uid < earliest.uid ? current : earliest
    )
  }

  // Then find non-output operation with highest option index
  const nonOutputOps = operations.filter(op => !isOutputOperation({ operation: op }))

  const choiceOperation = nonOutputOps.reduce<Operation | null>((bestOperation, currentOperation) => {
    const currentIndex = getOptionIndex({ operation: currentOperation })
    const bestIndex = bestOperation != null
      ? getOptionIndex({ operation: bestOperation })
      : -1

    if (currentIndex > bestIndex) {
      return currentOperation
    }

    if (currentIndex === bestIndex &&
        bestOperation != null &&
        currentOperation.uid < bestOperation.uid) {
      return currentOperation
    }

    return bestOperation
  }, null)

  if (choiceOperation == null) {
    throw new Error('No operation found')
  }

  return choiceOperation
}

import getOperationsSteps from './getOperationsSteps'
import getPrioritized from './getPrioritized'
import getMaximumSteps from './getMaximumSteps'
import { Operation, OperationDictionary } from './mergeChoiceTypes'

export default function getChoiceOperation (props: {
  operations: OperationDictionary
}): Operation {
  const maxSteps = getOperationsSteps({ operations: props.operations })
  const values = Object.values(props.operations)
  const maximalOperations = values.filter(operation => {
    const steps = getMaximumSteps({ operation })
    return steps === maxSteps
  })
  const operation = getPrioritized(maximalOperations)
  return operation
}

import { Choice, Flow } from './types'
import isFlowComplete from './isFlowComplete'
import getChoiceOperation from './getChoiceOperation'
import getOptionIndex from './getOptionIndex'

export default function getChoice (props: {
  flow: Flow
}): Choice | undefined {
  if (isFlowComplete({ flow: props.flow })) {
    return undefined
  }

  try {
    const selectedOperation = getChoiceOperation({ flow: props.flow })

    if (selectedOperation.queue.length === 0 || selectedOperation.catalog.length === 0) {
      return undefined
    }

    const aItem = selectedOperation.queue[0]
    const optionIndex = getOptionIndex({ operation: selectedOperation })
    const bItem = selectedOperation.catalog[optionIndex]

    return {
      queue: aItem,
      catalog: bItem,
      operation: selectedOperation.uid
    }
  } catch {
    return undefined
  }
}

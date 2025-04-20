import { Flow } from './flowTypes'
import getChoice from './getChoice'
import getOptionIndex from './getOptionIndex'
import getFloorHalf from './getFloorHalf'
import getInitialOptionIndex from './getInitialOptionIndex'

export default function operate (props: {
  flow: Flow
  option: string
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  const operation = props.flow.operations[choice.operation]
  const optionIndex = getOptionIndex({ operation })

  // Validate option is in choice
  if (props.option !== choice.queue && props.option !== choice.catalog) {
    throw new Error('Option is not in the choice')
  }

  // Validate better if defined
  if (operation.better != null) {
    if (typeof operation.better !== 'number') {
      throw new Error('Better must be a number')
    }
    if (operation.better < 1) {
      throw new Error('Better must be positive')
    }
    const initial = getInitialOptionIndex({ operation })
    if (operation.better > initial) {
      throw new Error('Better cannot be greater than the initial option index')
    }
  }

  // Validate queue length
  if (operation.queue.length > operation.catalog.length) {
    throw new Error('Queue cannot be longer than catalog')
  }

  // Validate catalog length for better
  if (operation.catalog.length <= 2 && operation.better != null) {
    throw new Error('Cannot have better defined when catalog is two or less long')
  }

  const newOperation = { ...operation }
  const newOperations = { ...props.flow.operations }

  if (props.option === choice.catalog) {
    // Handle catalog choice
    if (optionIndex === 0) {
      newOperation.better = undefined
      if (operation.queue.length === 1) {
        // Move queue item to end of output followed by full catalog
        newOperation.output = [
          ...operation.output,
          operation.queue[0],
          ...operation.catalog
        ]
        newOperation.queue = []
        newOperation.catalog = []
      } else {
        // Move first queue item to end of output
        newOperation.output = [
          ...operation.output,
          operation.queue[0]
        ]
        newOperation.queue = operation.queue.slice(1)
      }
    } else {
      // Option index > 0
      if (operation.better == null) {
        newOperation.better = optionIndex
      } else {
        newOperation.better = getFloorHalf({ value: operation.better })
      }
    }
  } else {
    // Handle queue choice
    if (operation.catalog.length === 1) {
      // Move catalog to end of output followed by queue
      newOperation.output = [
        ...operation.output,
        operation.catalog[0],
        operation.queue[0]
      ]
      newOperation.catalog = []
      newOperation.queue = operation.queue.slice(1)
      newOperation.better = undefined
    } else {
      // Move catalog items through option index to output
      const catalogToOutput = operation.catalog.slice(0, optionIndex + 1)
      newOperation.output = [
        ...operation.output,
        ...catalogToOutput
      ]
      newOperation.catalog = operation.catalog.slice(optionIndex + 1)

      if (operation.better != null) {
        const difference = operation.better - optionIndex
        if (difference === 1) {
          // Move first queue item to output and set better to undefined
          newOperation.output = [
            ...newOperation.output,
            operation.queue[0]
          ]
          newOperation.queue = operation.queue.slice(1)
          newOperation.better = undefined
          // If queue is now empty, move remaining catalog to output
          if (newOperation.queue.length === 0) {
            newOperation.output = [
              ...newOperation.output,
              ...newOperation.catalog
            ]
            newOperation.catalog = []
          }
        } else {
          // Set better to floor half of (better - 1)
          newOperation.better = getFloorHalf({ value: operation.better - 1 })
        }
      } else {
        newOperation.better = undefined
      }

      // Switch queue and catalog if queue is equal or longer
      if (newOperation.queue.length >= newOperation.catalog.length) {
        const temp = newOperation.queue
        newOperation.queue = newOperation.catalog
        newOperation.catalog = temp
      }
    }
  }

  newOperations[choice.operation] = newOperation

  return {
    ...props.flow,
    operations: newOperations
  }
}

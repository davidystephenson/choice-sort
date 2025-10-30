import { Operation } from './types'
import getFloorHalf from './getFloorHalf'
import getInitialOptionIndex from './getInitialOptionIndex'

export default function getOptionIndex (props: {
  operation: Operation
}): number {
  if (props.operation.better != null) {
    if (typeof props.operation.better !== 'number') {
      throw new Error('Better must be a number')
    }
    if (props.operation.better < 1) {
      throw new Error('Better must be positive')
    }
    const initial = getInitialOptionIndex({ operation: props.operation })
    if (props.operation.better > initial) {
      throw new Error('Better must be less than or equal to the initial option index')
    }
    return getFloorHalf({ value: props.operation.better })
  }

  return getInitialOptionIndex({ operation: props.operation })
}

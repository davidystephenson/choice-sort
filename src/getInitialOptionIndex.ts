import { Operation } from './flowTypes'
import getFloorHalf from './getFloorHalf'

export default function getInitialOptionIndex (props: {
  operation: Operation
}): number {
  const difference = props.operation.catalog.length - 1
  const half = getFloorHalf({ value: difference })
  return half
}

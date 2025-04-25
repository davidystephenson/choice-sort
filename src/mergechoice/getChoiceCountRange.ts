import arrayToDictionary from './arrayToDictionary'
import createOperation from './createOperation'
import getTotalSteps from './getTotalSteps'
import getOperations from './getOperations'
import { Item, State, CountRange } from './mergeChoiceTypes'

export default function getChoiceCountRange <ListItem extends Item> (props: {
  state: State<ListItem>
}): CountRange {
  const fakeState = { ...props.state }
  const activeTotal = getTotalSteps({
    operations: props.state.activeOperations
  })
  const betterTotal = getTotalSteps({
    operations: props.state.betterOperations
  })
  const worseTotal = getTotalSteps({
    operations: props.state.worseOperations
  })
  const reserveOperationArray = props.state.reserveIds.map(id => {
    return createOperation({
      output: [id],
      state: fakeState
    })
  })
  const reserveOperations = arrayToDictionary({ array: reserveOperationArray })
  const newReserveOperations = getOperations({
    activeOperations: reserveOperations,
    state: fakeState
  })
  const activePostOperation = createOperation({
    output: props.state.activeIds,
    state: fakeState
  })
  const betterPostOperation = createOperation({
    output: props.state.betterIds,
    state: fakeState
  })
  const worsePostOperation = createOperation({
    output: props.state.worseIds,
    state: fakeState
  })
  const operations = {
    ...newReserveOperations,
    [activePostOperation.mergeChoiceId]: activePostOperation,
    [betterPostOperation.mergeChoiceId]: betterPostOperation,
    [worsePostOperation.mergeChoiceId]: worsePostOperation
  }
  const reserveTotal = getTotalSteps({
    operations
  })
  const maximum = activeTotal.maximum + betterTotal.maximum + worseTotal.maximum + reserveTotal.maximum
  const minimum = activeTotal.minimum + betterTotal.minimum + worseTotal.minimum + reserveTotal.minimum
  return {
    maximum,
    minimum
  }
}

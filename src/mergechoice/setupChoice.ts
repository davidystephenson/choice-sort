import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import populate from './populate'
import sortItems from './sortItems'
import { Item, State } from './mergeChoiceTypes'
import getItem from './getItem'
import createOperation from './createOperation'

export default function setupChoice <ListItem extends Item> (props: {
  debug?: boolean
  state: State<ListItem>
}): State<ListItem> {
  const maxSteps1 = getOperationsSteps({ operations: props.state.activeOperations })
  if (maxSteps1 > 0) {
    const choiceState = createActiveChoice({
      debug: props.debug,
      state: props.state
    })
    choiceState.complete = false
    return choiceState
  } else {
    const newState = { ...props.state }
    const newOperations = getOperations({
      activeOperations: props.state.activeOperations,
      state: newState
    })
    const maxSteps2 = getOperationsSteps({ operations: newOperations })
    if (maxSteps2 > 0) {
      newState.activeOperations = newOperations
      const choiceState = createActiveChoice({
        debug: props.debug,
        state: newState
      })
      choiceState.complete = false
      return newState
    } else {
      sortItems({
        ids: newState.worseIds,
        state: newState,
        worseFirst: true
      })
      sortItems({
        ids: newState.activeIds,
        state: newState,
        worseFirst: true
      })
      sortItems({
        ids: newState.betterIds,
        state: newState,
        worseFirst: true
      })
      const combinedIds = [
        ...newState.worseIds, ...newState.activeIds, ...newState.betterIds
      ]
      const combinedOperation = createOperation({
        output: combinedIds,
        state: newState
      })
      const combinedOperations = { [combinedOperation.mergeChoiceId]: combinedOperation }
      newState.activeIds = combinedIds
      newState.betterIds = []
      newState.worseIds = []
      newState.activeOperations = combinedOperations
      newState.choice = undefined
      newState.complete = false
      const reserveItems = props.state.reserveIds.map(itemId => getItem({ itemId, items: props.state.items }))
      const population = populate({
        items: reserveItems,
        state: newState
      })
      return population.state
    }
  }
}

import createState from './createState'
import createActiveChoice from './createActiveChoice'
import getOperationsSteps from './getOperationsSteps'
import getOperations from './getOperations'
import { Item, Population, State } from './mergeChoiceTypes'
import getItem from './getItem'
import arrayToDictionary from './arrayToDictionary'
import createOperation from './createOperation'
import completeState from './completeState'
import sortOutputs from './sortOutputs'

export default function populate<ListItem extends Item> (props: {
  items: ListItem[]
  state: State<ListItem>
}): Population<ListItem> {
  const newItems = props.items.filter(item => {
    try {
      getItem({ itemId: item.id, items: props.state.items })
      return false
    } catch (error) {
      return true
    }
  })

  const newIds = newItems.map(item => item.id)
  const condition = !props.state.complete &&
    (props.state.betterIds.length !== 0 || props.state.worseIds.length !== 0 || props.state.choice?.random === true)
  if (condition) {
    newItems.forEach(item => {
      props.state.items[item.id] = item
    })
    props.state.reserveIds.push(...newIds)
    return { state: props.state, items: newItems }
  }
  const newState: State<ListItem> = createState({ seed: props.state.seed })
  newState.archive = props.state.archive
  newState.choiceCount = props.state.choiceCount
  newState.operationCount = props.state.operationCount
  for (const id in props.state.items) {
    newState.items[id] = props.state.items[id]
  }
  newItems.forEach(item => {
    newState.items[item.id] = item
  })
  newState.history = props.state.history
  newState.activeIds = newIds
  const sortedOutputs = sortOutputs({ items: newItems })
  const activeOperationArray = sortedOutputs.map(output => {
    const outputIds = output.map(item => item.id)
    const operation = createOperation({ output: outputIds, state: newState })
    return operation
  })
  const activeOperationDictionary = arrayToDictionary({ array: activeOperationArray })
  newState.activeOperations = activeOperationDictionary
  newState.activeIds.push(...props.state.activeIds)
  const newActiveOperations = getOperations({
    activeOperations: newState.activeOperations,
    state: newState
  })
  newState.activeOperations = newActiveOperations
  newState.activeOperations = {
    ...newState.activeOperations,
    ...props.state.activeOperations
  }
  const maxSteps = getOperationsSteps({ operations: newState.activeOperations })
  if (maxSteps === 0) {
    newState.choice = undefined
    const completedState = completeState({ state: newState })
    return { state: completedState, items: newItems }
  }
  const choiceState = createActiveChoice({
    state: newState
  })
  return { state: choiceState, items: newItems }
}

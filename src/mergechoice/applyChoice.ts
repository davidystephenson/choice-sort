import getPoints from './getPoints'
import setupChoice from './setupChoice'
import applyRandomChoice from './applyRandomChoice'
import { Item, State } from './mergeChoiceTypes'
import getOperation from './getOperation'

export default function applyChoice <ListItem extends Item> (props: {
  aBetter: boolean
  aItem: ListItem
  betterIndex: number
  bItem: ListItem
  debug?: boolean
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice == null) {
    throw new Error('There is no choice.')
  }
  const aPoints = getPoints({ itemId: props.aItem.id, state: props.state })
  const bPoints = getPoints({ itemId: props.bItem.id, state: props.state })
  if (props.state.choice.random) {
    const newState = applyRandomChoice({
      aBetter: props.aBetter,
      aItem: props.aItem,
      aPoints,
      bItem: props.bItem,
      bPoints,
      state: props.state
    })
    return newState
  }
  if (props.state.choice.operationMergeChoiceId == null) {
    throw new Error('There is no currentOperationId')
  }
  const currentOperation = getOperation({
    operations: props.state.activeOperations,
    operationId: props.state.choice.operationMergeChoiceId
  })
  const betterInput = currentOperation.input[props.betterIndex]
  const worseIndex = 1 - props.betterIndex
  const worseInput = currentOperation.input[worseIndex]
  const worseId = worseInput.shift()
  if (worseId == null) {
    throw new Error('There is no worseId')
  }
  currentOperation.output.push(worseId)
  if (worseInput.length === 0) {
    currentOperation.output.push(...betterInput)
    currentOperation.input[props.betterIndex] = []
  }
  return setupChoice({
    debug: props.debug,
    state: props.state
  })
}

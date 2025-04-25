import createChoice from './createChoice'
import getChoiceOperation from './getChoiceOperation'
import getRandomRange from './getRandomRange'
import { ChoiceData, Item, State } from './mergeChoiceTypes'

export default function createActiveChoice<ListItem extends Item> (props: {
  debug?: boolean
  state: State<ListItem>
}): State<ListItem> {
  const choiceOperation = getChoiceOperation({ operations: props.state.activeOperations })
  const firstOption = choiceOperation.input[0][0]
  if (firstOption == null) {
    throw new Error('There is no first option.')
  }
  const secondOption = choiceOperation.input[1][0]
  if (secondOption == null) {
    throw new Error('There is no second option.')
  }
  const seed = `${props.state.seed}${props.state.choiceCount}`
  const aIndex = getRandomRange({ debug: props.debug, seed, maximum: 2 })
  if (props.debug === true) {
    console.debug('aIndex', aIndex)
  }
  const bIndex = 1 - aIndex
  if (props.debug === true) {
    console.debug('bIndex', bIndex)
  }
  const newChoiceData: ChoiceData = {
    options: [firstOption, secondOption],
    operationMergeChoiceId: choiceOperation.mergeChoiceId,
    aIndex,
    bIndex,
    random: false
  }
  const newChoice = createChoice({
    choice: newChoiceData,
    state: props.state
  })
  props.state.choice = newChoice
  return props.state
}

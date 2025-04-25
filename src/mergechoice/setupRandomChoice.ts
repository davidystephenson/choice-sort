import createRandomChoice from './createRandomChoice'
import getCalculatedItem from './getCalculatedItem'
import getRandomElement from './getRandomElement'
import { Item, State } from './mergeChoiceTypes'

export default function setupRandomChoice<ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  if (!props.state.complete) {
    throw new Error('The state must be complete to create a random choice')
  }
  const lastEpisode = props.state.history[0]
  if (lastEpisode == null) {
    throw new Error('There is no last episode')
  }
  const items = Object.values(props.state.items)
  if (items.length < 2) {
    throw new Error('There must be at least two active items to create a random choice')
  }
  const seed = `${props.state.seed}${props.state.choiceCount}`
  const firstSeed = `first${seed}`
  const firstId = getRandomElement({
    array: props.state.activeIds,
    seed: firstSeed
  })
  const firstItem = getCalculatedItem({
    itemId: firstId,
    state: props.state
  })
  const otherIds = props.state.activeIds.filter(id => id !== firstId)
  const secondSeed = `second${seed}`
  const secondId = getRandomElement({
    array: otherIds,
    seed: secondSeed
  })
  const secondItem = getCalculatedItem({
    itemId: secondId,
    state: props.state
  })
  return createRandomChoice({
    state: props.state,
    firstItem,
    secondItem
  })
}

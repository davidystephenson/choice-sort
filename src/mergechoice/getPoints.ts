import getPointsFromOperations from './getPointsFromOperations'
import { ItemId, Item, State } from './mergeChoiceTypes'

export default function getPoints <ListItem extends Item> (props: {
  debug?: boolean
  itemId: ItemId
  state: State<ListItem>
}): number {
  if (props.debug === true) {
    console.debug('state', props.state)
  }
  const betterItem = props.state.betterIds.some(betterId => betterId === props.itemId)
  if (betterItem) {
    const betterPoints = getPointsFromOperations({
      itemId: props.itemId,
      operations: props.state.betterOperations
    })
    const points = betterPoints + props.state.activeIds.length + props.state.worseIds.length
    return points
  }
  const worseItem = props.state.worseIds.some(worseId => worseId === props.itemId)
  if (worseItem) {
    return getPointsFromOperations({ itemId: props.itemId, operations: props.state.worseOperations })
  }
  const reserveItem = props.state.reserveIds.some(reserveId => reserveId === props.itemId)
  if (reserveItem) {
    return 0
  }
  const activePoints = getPointsFromOperations({
    itemId: props.itemId,
    operations: props.state.activeOperations
  })
  const points = activePoints + props.state.worseIds.length
  return points
}

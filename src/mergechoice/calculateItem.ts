import getPoints from './getPoints'
import { Item, State, Calculated } from './mergeChoiceTypes'

export default function calculateItem <ListItem extends Item> (props: {
  item: ListItem
  state: State<ListItem>
}): Calculated<ListItem> {
  const statePoints = getPoints({ itemId: props.item.id, state: props.state })
  const calculatedItem: Calculated<ListItem> = { ...props.item, points: statePoints }
  return calculatedItem
}

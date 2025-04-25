import calculateItem from './calculateItem'
import getItem from './getItem'
import { Calculated, Item, ItemId, State } from './mergeChoiceTypes'

export default function getCalculatedItem <ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): Calculated<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  return calculateItem({ item, state: props.state })
}

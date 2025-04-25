import getItem from './getItem'
import { Item, ItemId } from './mergeChoiceTypes'

export default function labelItem <ListItem extends Item> (props: {
  itemId: ItemId
  items: Record<string, ListItem>
}): string {
  const item = getItem({
    itemId: props.itemId,
    items: props.items
  })
  return item.name
}

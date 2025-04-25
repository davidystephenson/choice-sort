import labelItem from './labelItem'
import { Item, ItemId } from './mergeChoiceTypes'

export default function debugItem <ListItem extends Item> (props: {
  itemId: ItemId
  items: Record<string, ListItem>
  label: string
}): void {
  const label = labelItem({
    itemId: props.itemId,
    items: props.items
  })
  console.debug(props.label, label)
}

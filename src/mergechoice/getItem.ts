import { Item, ItemId } from './mergeChoiceTypes'

export default function getItem <ListItem extends Item> ({ itemId, items }: {
  itemId: ItemId
  items: Record<string, ListItem>
}): ListItem {
  const item = items[itemId]
  if (item == null) {
    throw new Error(`Item ${itemId} not found`)
  }
  return item
}

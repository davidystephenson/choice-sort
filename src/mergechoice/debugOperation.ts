import labelOperation from './labelOperation'
import { Item, Operation } from './mergeChoiceTypes'

export default function debugOperation <ListItem extends Item> ({ label, items, operation }: {
  label: string
  items: Record<string, ListItem>
  operation: Operation
}): void {
  const labeled = labelOperation({ items, operation })
  console.debug(label, labeled)
}

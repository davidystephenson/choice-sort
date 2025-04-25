import { Item, State } from './mergeChoiceTypes'

export default function completeState <ListItem extends Item> (props: {
  state: State<ListItem>
}): State<ListItem> {
  for (const itemId in props.state.items) {
    props.state.items[itemId].seeding = false
  }
  return { ...props.state, complete: true }
}

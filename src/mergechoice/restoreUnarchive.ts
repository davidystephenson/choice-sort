import { EpisodeUnarchive, Item, State } from './mergeChoiceTypes'
import unarchiveItem from './unarchiveItem'

export default function restoreUnarchive <ListItem extends Item> (props: {
  input: EpisodeUnarchive<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = unarchiveItem({
    itemId: props.input.item.id,
    state: props.state
  })
  return resetState
}

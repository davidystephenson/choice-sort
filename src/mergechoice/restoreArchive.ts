import archiveItem from './archiveItem'
import { EpisodeArchive, Item, State } from './mergeChoiceTypes'

export default function restoreArchive <ListItem extends Item> (props: {
  input: EpisodeArchive<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = archiveItem({
    itemId: props.input.item.id,
    state: props.state
  })
  return resetState
}

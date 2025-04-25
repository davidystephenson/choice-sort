import importItems from './importItems'
import { EpisodeImport, Item, State } from './mergeChoiceTypes'

export default function restoreImport<ListItem extends Item> (props: {
  input: EpisodeImport<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const importedState = importItems({
    items: props.input.items,
    state: props.state
  })
  return importedState
}

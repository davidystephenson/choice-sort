import addEpisode from './addEpisode'
import importItems from './importItems'
import { Item, ItemId, State } from './mergeChoiceTypes'

export default function unarchiveItem<ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = props.state.archive[props.itemId]
  if (item == null) {
    const message = `There is no archive ${props.itemId}`
    throw new Error(message)
  }
  const calculated = {
    ...item,
    points: 0
  }
  const { [props.itemId]: removedArchive, ...newArchive } = props.state.archive
  void removedArchive
  props.state.archive = newArchive
  const importedState = importItems({
    items: [item],
    state: props.state,
    silent: true
  })
  const data = {
    unarchive: {
      item: calculated
    }
  }
  addEpisode({
    data,
    state: importedState
  })
  return importedState
}

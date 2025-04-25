import { ItemId, Item, State } from './mergeChoiceTypes'
import getItem from './getItem'
import removeItem from './removeItem'
import importItems from './importItems'
import getCalculatedItem from './getCalculatedItem'
import addEpisode from './addEpisode'

export default function resetItem<ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  item.seeding = false
  const removedState = removeItem({
    itemId: props.itemId,
    silent: true,
    state: props.state
  })
  const importedState = importItems({
    items: [item],
    silent: true,
    state: removedState
  })
  const importedItem = getCalculatedItem({
    itemId: item.id,
    state: importedState
  })
  const data = {
    reset: {
      item: importedItem
    }
  }
  addEpisode({
    data,
    state: importedState
  })
  return importedState
}

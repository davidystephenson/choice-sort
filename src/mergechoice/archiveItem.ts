import addEpisode from './addEpisode'
import getItem from './getItem'
import getPoints from './getPoints'
import { Calculated, Item, ItemId, State } from './mergeChoiceTypes'
import removeItem from './removeItem'

export default function archiveItem<ListItem extends Item> (props: {
  itemId: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ itemId: props.itemId, items: props.state.items })
  const points = getPoints({ itemId: props.itemId, state: props.state })
  const calculated: Calculated<ListItem> = {
    ...item,
    points
  }
  const data = {
    archive: {
      item: calculated
    }
  }
  addEpisode({
    data,
    state: props.state
  })
  const removedState = removeItem({
    itemId: props.itemId,
    silent: true,
    state: props.state
  })
  removedState.archive[item.id] = item
  return removedState
}

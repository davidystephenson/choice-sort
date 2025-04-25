import compareItems from './compareItems'
import { ItemId, Item, State } from './mergeChoiceTypes'

export default function sortItems <ListItem extends Item> ({
  ids,
  state,
  worseFirst = false
}: {
  ids: ItemId[]
  state: State<ListItem>
  worseFirst?: boolean
}): void {
  ids.sort((aId, bId) => {
    return compareItems({
      aId,
      bId,
      state,
      worseFirst
    })
  })
}

import chooseOption from './chooseOption'
import debugChoice from './debugChoice'
import getItem from './getItem'
import { Item, State } from './mergeChoiceTypes'

export default function seedChoice <ListItem extends Item> (props: {
  debug?: boolean
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice != null) {
    const firstItem = getItem({
      itemId: props.state.choice.options[0],
      items: props.state.items
    })
    const secondItem = getItem({
      itemId: props.state.choice.options[1],
      items: props.state.items
    })
    const seeding = firstItem.seeding && secondItem.seeding
    if (
      seeding &&
      firstItem.seed != null &&
      secondItem.seed != null &&
      firstItem.seed !== secondItem.seed
    ) {
      const betterIndex = firstItem.seed > secondItem.seed ? 0 : 1
      if (props.debug === true) {
        debugChoice({
          choice: props.state.choice,
          items: props.state.items,
          label: 'seedChoice'
        })
      }
      const chosenState = chooseOption({
        betterIndex,
        seeded: true,
        state: props.state
      })
      return seedChoice({
        state: chosenState
      })
    }
  }
  return props.state
}

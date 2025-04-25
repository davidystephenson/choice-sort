import addEpisode from './addEpisode'
import createChoice from './createChoice'
import { Item, State, ChoiceData, Calculated } from './mergeChoiceTypes'

export default function createRandomChoice <ListItem extends Item> (props: {
  state: State<ListItem>
  firstItem: Calculated<ListItem>
  secondItem: Calculated<ListItem>
}): State<ListItem> {
  const newChoiceData: ChoiceData = {
    aIndex: 0,
    bIndex: 1,
    options: [props.firstItem.id, props.secondItem.id],
    random: true
  }
  const newChoice = createChoice({
    choice: newChoiceData,
    state: props.state
  })
  const data = {
    random: {
      first: props.firstItem,
      second: props.secondItem
    }
  }
  addEpisode({
    data,
    state: props.state
  })
  return {
    ...props.state,
    choice: newChoice,
    complete: false
  }
}

import chooseOption from './chooseOption'
import { EpisodeChoice, Item, State } from './mergeChoiceTypes'

export default function restoreChoice<ListItem extends Item> (props: {
  input: EpisodeChoice<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.input.seeded) {
    return props.state
  }
  const chosenState = chooseOption({
    state: props.state,
    betterIndex: props.input.betterIndex
  })
  return chosenState
}

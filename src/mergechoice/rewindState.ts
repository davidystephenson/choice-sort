import deduceState from './deduceState'
import getRewindIndex from './getRewindIndex'
import { History, Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> (props: {
  episodeId: number
  history: History<ListItem>
  onEpisode?: (props: {
    index: number
  }) => void
  seed: string
}): State<ListItem> {
  const index = getRewindIndex({
    episodeId: props.episodeId,
    history: props.history
  })
  const episodes = props.history.slice(index + 1)
  const newState = deduceState({
    history: episodes,
    onEpisode: props.onEpisode,
    seed: props.seed
  })
  return newState
}

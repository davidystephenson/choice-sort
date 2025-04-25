import { Item, History } from './mergeChoiceTypes'

export default function getRewindIndex <ListItem extends Item> (props: {
  episodeId: number
  history: History<ListItem>
}): number {
  const index = props.history.findIndex(
    episode => episode.mergeChoiceId === props.episodeId
  )
  if (index === -1) {
    throw new Error('There is no episode')
  }
  return index
}

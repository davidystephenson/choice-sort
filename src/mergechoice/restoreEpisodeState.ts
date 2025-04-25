import { marion } from './marion/marion'
import { Actors } from './marion/marionTypes'
import { EpisodePart, EpisodePartListItem, Item, State } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

export function marionHistoryState<
  ListItem extends Item,
  Complement,
  Part extends EpisodePart<ListItem>
> (props: {
  actors: Actors<Complement, State<EpisodePartListItem<Part>>, Part>
  complement: Complement
  part: Part
}): State<EpisodePartListItem<Part>> {
  const mapped = marion(props)
  return mapped
}

export default function restoreEpisodeState<ListItem extends Item> (props: {
  episode: EpisodePart<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  // const actors: Actors<{ state: State<ListItem> }, State<ListItem>, HistoryDataPart<ListItem>> = {
  //   archive: restoreArchive,
  //   choice: restoreChoice,
  //   import: restoreImport,
  //   random: restoreRandom,
  //   remove: restoreRemove,
  //   reset: restoreReset,
  //   unarchive: restoreUnarchive
  // }
  // void actors
  const restoredState = marionHistoryState({
    // actors,
    actors: {
      archive: restoreArchive,
      choice: restoreChoice,
      import: restoreImport,
      random: restoreRandom,
      remove: restoreRemove,
      reset: restoreReset,
      unarchive: restoreUnarchive
    },
    complement: { state: props.state },
    part: props.episode
  })
  return restoredState
}

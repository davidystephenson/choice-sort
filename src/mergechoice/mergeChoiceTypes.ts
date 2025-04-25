import { Part } from './marion/marionTypes'

export type ItemId = number | string
export interface Identity {
  mergeChoiceId: number
}
export interface Item {
  id: ItemId
  seeding: boolean
  name: string
  seed?: number
}
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: ItemId[][]
  output: ItemId[]
  priority: number
}
export interface ChoiceData {
  options: ItemId[]
  operationMergeChoiceId?: number | null
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export interface OptionChoice <ListItem extends Item> {
  betterIndex: number
  debug?: boolean
  seeded?: boolean
  state: State<ListItem>
}
export type OperationDictionary = Record<number, Operation>
export type ItemDictionary<ListItem> = Record<ItemId, ListItem>
export interface State<ListItem extends Item> {
  activeIds: ItemId[]
  activeOperations: OperationDictionary
  archive: ItemDictionary<ListItem>
  betterIds: ItemId[]
  betterOperations: OperationDictionary
  choice?: Choice
  choiceCount: number
  complete: boolean
  history: History<ListItem>
  items: ItemDictionary<ListItem>
  operationCount: number
  reserveIds: ItemId[]
  seed: string
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}
export type EpisodePart<ListItem extends Item> = Part<Episode<ListItem>>
export type EpisodePartListItem<P extends EpisodePart<any>> = P extends EpisodePart<infer T> ? T : unknown
export interface EpisodeItem<ListItem extends Item> {
  item: Calculated<ListItem>
}
export interface EpisodeArchive<ListItem extends Item> extends EpisodeItem<ListItem> { }
export interface EpisodeRemove<ListItem extends Item> extends EpisodeItem<ListItem> { }
export interface EpisodeReset<ListItem extends Item> extends EpisodeItem<ListItem> { }
export interface EpisodeUnarchive<ListItem extends Item> extends EpisodeItem<ListItem> { }
export interface EpisodeChoice<ListItem extends Item> {
  aBetter: boolean
  aId: ItemId
  aItem: Calculated<ListItem>
  betterIndex: number
  bId: ItemId
  bItem: Calculated<ListItem>
  random: boolean
  seeded: boolean
}
export interface EpisodeImport<ListItem extends Item> {
  items: Array<Calculated<ListItem>>
}
export interface EpisodeRandom<ListItem extends Item> {
  first: Calculated<ListItem>
  second: Calculated<ListItem>
}
export interface ArchivePart <ListItem extends Item> {
  archive?: EpisodeArchive<ListItem>
}
export interface ChoicePart<ListItem extends Item> {
  choice?: EpisodeChoice<ListItem>
}
export interface ImportPart<ListItem extends Item> {
  import?: EpisodeImport<ListItem>
}
export interface RandomPart<ListItem extends Item> {
  random?: EpisodeRandom<ListItem>
}
export interface RemovePart<ListItem extends Item> {
  remove?: EpisodeRemove<ListItem>
}
export interface ResetPart<ListItem extends Item> {
  reset?: EpisodeReset<ListItem>
}
export interface UnarchivePart<ListItem extends Item> {
  unarchive?: EpisodeUnarchive<ListItem>
}
export interface Episode<ListItem extends Item> extends Identity, ArchivePart<ListItem>, ChoicePart<ListItem>, ImportPart<ListItem>, RandomPart<ListItem>, RemovePart<ListItem>, ResetPart<ListItem>, UnarchivePart<ListItem> {
  createdAt: number
}
export type History<ListItem extends Item> = Array<Episode<ListItem>>

export interface RemovalFromOperations {
  emptiedOperationId?: ItemId
  operations: OperationDictionary
}
export interface CountRange {
  maximum: number
  minimum: number
}
export interface Population<ListItem extends Item> {
  state: State<ListItem>
  items: ListItem[]
}
export interface Prioritized {
  priority: number
}
export type StoredState<ListItem extends Item> = Pick<State<ListItem>, 'seed' | 'history'>

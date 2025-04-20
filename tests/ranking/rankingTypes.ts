import { RankingItem } from '../../src'

export type RankingTest = Omit<RankingItem, 'label' | 'seed'> & {
  debug?: boolean
}

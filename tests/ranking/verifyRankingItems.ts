import { RankingItem } from '../../src'
import { RankingTest } from './rankingTypes'
import verifyRankingItem from './verifyRankingItem'

export default function verifyRankingItems (props: {
  ranking: RankingItem[]
  items: RankingTest[]
}): void {
  const label = `should rank ${props.items.length} items`
  it(label, () => {
    expect(props.ranking.length).toBe(props.items.length)
  })
  props.items.forEach((item, index) => {
    verifyRankingItem({
      ranking: props.ranking,
      index,
      ...item
    })
  })
}

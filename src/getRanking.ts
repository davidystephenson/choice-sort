import { Flow, RankingItem } from './flowTypes'

export default function getRanking (props: {
  flow: Flow
}): RankingItem[] {
  const empty = Object.keys(props.flow.operations).length === 0
  if (empty) {
    return []
  }

  const operations = Object.values(props.flow.operations)
  const operationItemUids = operations.flatMap(operation => {
    return [...operation.queue, ...operation.catalog, ...operation.output]
  })

  const uniqueOperationItemUids = new Set<string | number>()
  const duplicateUids: Array<string | number> = []

  operationItemUids.forEach(uid => {
    const duplicate = uniqueOperationItemUids.has(uid)
    if (duplicate) {
      duplicateUids.push(uid)
    } else {
      uniqueOperationItemUids.add(uid)
    }
  })

  const hasDuplicates = duplicateUids.length > 0
  if (hasDuplicates) {
    const joined = duplicateUids.join(', ')
    throw new Error(`Duplicate item UIDs: ${joined}`)
  }

  const items = Object.values(props.flow.items)
  const missingOperationItemUids = Array.from(uniqueOperationItemUids).filter(uid => {
    return !items.some(item => item.uid === uid)
  })

  const hasMissingOperationItems = missingOperationItemUids.length > 0
  if (hasMissingOperationItems) {
    const joined = missingOperationItemUids.join(', ')
    throw new Error(`Missing items: ${joined}`)
  }

  const missingItems = items.filter(item => {
    return !operationItemUids.includes(item.uid)
  })

  const hasMissingItems = missingItems.length > 0
  if (hasMissingItems) {
    const uids = missingItems.map(item => item.uid)
    const joined = uids.join(', ')
    throw new Error(`Missing items: ${joined}`)
  }

  const rankingItemsMap = new Map<string | number, RankingItem>()

  operations.forEach((operation) => {
    const outputLength = operation.output.length

    operation.output.forEach((outputUid, index) => {
      const item = props.flow.items[outputUid]
      rankingItemsMap.set(outputUid, {
        ...item,
        points: index,
        rank: 1
      })
    })

    operation.queue.forEach((aInputUid, index) => {
      const item = props.flow.items[aInputUid]
      const points = index + outputLength
      rankingItemsMap.set(aInputUid, {
        ...item,
        points,
        rank: 1
      })
    })

    operation.catalog.forEach((bInputUid, index) => {
      const item = props.flow.items[bInputUid]
      const better = operation.better != null && operation.better <= index
      const betterOffset = better ? 1 : 0
      const points = index + outputLength + betterOffset
      rankingItemsMap.set(bInputUid, {
        ...item,
        points,
        rank: 1
      })
    })
  })

  const rankingItems = Array.from(rankingItemsMap.values())
  const pointValues = rankingItems.map(item => item.points)
  const uniquePointValues = [...new Set(pointValues)]
  const descendingPointValues = uniquePointValues.sort((a, b) => b - a)

  rankingItems.forEach(item => {
    const greaterPoints = descendingPointValues.filter(points => points > item.points)
    item.rank = greaterPoints.length + 1
  })

  rankingItems.sort((a, b) => {
    if (a.rank !== b.rank) {
      return a.rank - b.rank
    }
    return a.label.localeCompare(b.label)
  })

  return rankingItems
}

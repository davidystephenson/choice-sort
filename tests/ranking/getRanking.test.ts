import { createFlow, getRanking, rankingItemSchema } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'
import createThreeFlow from '../flow/createThreeFlow'
import getVerifiedRankingItem from './getVerifiedRankingItem'

it('should throw an error if an operation item UID is missing from the items', () => {
  const flow = createFlow({ uid: 'test' })
  flow.items = {
    a: { label: 'a', seed: 0, uid: 'a' },
    b: { label: 'b', seed: 0, uid: 'b' }
  }
  const operation = createOperation({
    queue: ['a'],
    catalog: ['b'],
    flow,
    output: ['c']
  })
  const addedFlow = addOperation({ flow, operation })
  expect(() => getRanking({ flow: addedFlow })).toThrow()
})

it('should throw an error if an item UID is missing from the operations', () => {
  const flow = createFlow({ uid: 'test' })
  flow.items = {
    a: { label: 'a', seed: 0, uid: 'a' },
    b: { label: 'b', seed: 0, uid: 'b' },
    c: { label: 'c', seed: 0, uid: 'c' }
  }
  const operation = createOperation({
    queue: ['a'],
    catalog: ['b'],
    flow,
    output: []
  })
  const addedFlow = addOperation({ flow, operation })
  expect(() => getRanking({ flow: addedFlow })).toThrow()
})

it('should throw an error if a UID is duplicated in the operations', () => {
  const flow = createFlow({ uid: 'test' })
  flow.items = {
    a: { label: 'a', seed: 0, uid: 'a' },
    b: { label: 'b', seed: 0, uid: 'b' },
    c: { label: 'c', seed: 0, uid: 'c' },
    d: { label: 'd', seed: 0, uid: 'd' },
    e: { label: 'e', seed: 0, uid: 'e' },
    f: { label: 'f', seed: 0, uid: 'f' },
    g: { label: 'g', seed: 0, uid: 'g' }
  }
  const operation1 = createOperation({
    queue: ['a'],
    catalog: ['b'],
    flow,
    output: ['c', 'd']
  })
  const addedFlow1 = addOperation({ flow, operation: operation1 })
  const operation2 = createOperation({
    queue: ['e', 'b'],
    catalog: ['g', 'f'],
    flow: addedFlow1,
    output: ['d', 'c']
  })
  const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })

  try {
    getRanking({ flow: addedFlow2 })
    fail('Expected getRanking to throw an error')
  } catch (error) {
    const errorMessage = String(error)
    expect(errorMessage).toContain('Duplicate item UIDs')
    expect(errorMessage).toContain('b')
    expect(errorMessage).toContain('c')
  }
})

it('should return an empty array if the flow is empty', () => {
  const flow = createFlow({ uid: 'test' })
  const ranking = getRanking({ flow })
  expect(ranking).toEqual([])
})

it('should return an array of ranking items', () => {
  const flow = createThreeFlow()
  const ranking = getRanking({ flow })
  const arrayed = Array.isArray(ranking)
  expect(arrayed).toBe(true)
  ranking.forEach(item => {
    const parsed = rankingItemSchema.parse(item)
    expect(parsed).toEqual(item)
  })
})

it('should give every item 0 points and rank 1 when no choices have been made', () => {
  const flow = createThreeFlow()
  const ranking = getRanking({ flow })
  ranking.forEach(item => {
    expect(item.points).toBe(0)
    expect(item.rank).toBe(1)
  })
})

it('should give input items points equal to the number of preceding items in their input', () => {
  const flow = createFlow({ uid: 'bond' })
  flow.items = {
    no: { label: 'no', seed: 0, uid: 'no' },
    russia: { label: 'russia', seed: 0, uid: 'russia' },
    goldfinger: { label: 'goldfinger', seed: 0, uid: 'goldfinger' },
    thunderball: { label: 'thunderball', seed: 0, uid: 'thunderball' },
    twice: { label: 'twice', seed: 0, uid: 'twice' }
  }
  const operation = createOperation({
    queue: ['no', 'russia'],
    catalog: ['goldfinger', 'thunderball', 'twice'],
    flow,
    output: []
  })
  const addedFlow = addOperation({ flow, operation })
  const ranking = getRanking({ flow: addedFlow })
  const no = getVerifiedRankingItem({ ranking, uid: 'no' })
  expect(no.points).toBe(0)
  const russia = getVerifiedRankingItem({ ranking, uid: 'russia' })
  expect(russia.points).toBe(1)
  const goldfinger = getVerifiedRankingItem({ ranking, uid: 'goldfinger' })
  expect(goldfinger.points).toBe(0)
  const thunderball = getVerifiedRankingItem({ ranking, uid: 'thunderball' })
  expect(thunderball.points).toBe(1)
  const twice = getVerifiedRankingItem({ ranking, uid: 'twice' })
  expect(twice.points).toBe(2)
})

describe('if better is defined', () => {
  it('should add 1 to all catalog items starting with the better index', () => {
    const bondFlow = createFlow({ uid: 'bond' })
    bondFlow.items = {
      no: { label: 'no', seed: 0, uid: 'no' },
      russia: { label: 'russia', seed: 0, uid: 'russia' },
      goldfinger: { label: 'goldfinger', seed: 0, uid: 'goldfinger' },
      thunderball: { label: 'thunderball', seed: 0, uid: 'thunderball' },
      twice: { label: 'twice', seed: 0, uid: 'twice' },
      casino1: { label: 'casino1', seed: 0, uid: 'casino1' },
      service: { label: 'service', seed: 0, uid: 'service' },
      diamonds: { label: 'diamonds', seed: 0, uid: 'diamonds' }
    }
    const bondOperation = createOperation({
      queue: ['no', 'russia'],
      catalog: ['goldfinger', 'thunderball', 'twice', 'casino1', 'service', 'diamonds'],
      flow: bondFlow,
      output: []
    })
    bondOperation.better = 2
    const bondAddedFlow = addOperation({ flow: bondFlow, operation: bondOperation })
    const bondRanking = getRanking({ flow: bondAddedFlow })
    const diamonds = getVerifiedRankingItem({ ranking: bondRanking, uid: 'diamonds' })
    expect(diamonds.points).toBe(6)
    const service = getVerifiedRankingItem({ ranking: bondRanking, uid: 'service' })
    expect(service.points).toBe(5)
    const casino1 = getVerifiedRankingItem({ ranking: bondRanking, uid: 'casino1' })
    expect(casino1.points).toBe(4)
    const twice = getVerifiedRankingItem({ ranking: bondRanking, uid: 'twice' })
    expect(twice.points).toBe(3)
    const thunderball = getVerifiedRankingItem({ ranking: bondRanking, uid: 'thunderball' })
    expect(thunderball.points).toBe(1)
    const goldfinger = getVerifiedRankingItem({ ranking: bondRanking, uid: 'goldfinger' })
    expect(goldfinger.points).toBe(0)

    const matrixFlow = createFlow({ uid: 'matrix' })
    matrixFlow.items = {
      online: { label: 'online', seed: 0, uid: 'online' },
      path: { label: 'path', seed: 0, uid: 'path' },
      awakens: { label: 'awakens', seed: 0, uid: 'awakens' },
      comics: { label: 'comics', seed: 0, uid: 'comics' },
      revisited: { label: 'revisited', seed: 0, uid: 'revisited' },
      enter: { label: 'enter', seed: 0, uid: 'enter' },
      original: { label: 'original', seed: 0, uid: 'original' },
      animatrix: { label: 'animatrix', seed: 0, uid: 'animatrix' },
      reloaded: { label: 'reloaded', seed: 0, uid: 'reloaded' },
      revolutions: { label: 'revolutions', seed: 0, uid: 'revolutions' }
    }
    matrixFlow.operations = {
      operation1: {
        better: 1,
        catalog: [
          'online',
          'path',
          'awakens'
        ],
        output: [
          'comics',
          'revisited',
          'enter',
          'original'
        ],
        queue: [
          'reloaded',
          'revolutions',
          'animatrix'
        ],
        uid: 'operation1'
      }
    }
    const matrixRanking = getRanking({ flow: matrixFlow })
    const online = getVerifiedRankingItem({ ranking: matrixRanking, uid: 'online' })
    expect(online.points).toBe(4)
    expect(online.rank).toBe(4)
  })
})

describe('if there are output items', () => {
  it('should add the number output items to the input points', () => {
    const flow = createFlow({ uid: 'bond' })
    flow.items = {
      no: { label: 'no', seed: 0, uid: 'no' },
      russia: { label: 'russia', seed: 0, uid: 'russia' },
      goldfinger: { label: 'goldfinger', seed: 0, uid: 'goldfinger' },
      thunderball: { label: 'thunderball', seed: 0, uid: 'thunderball' },
      twice: { label: 'twice', seed: 0, uid: 'twice' },
      casino1: { label: 'casino1', seed: 0, uid: 'casino1' }
    }
    const operation = createOperation({
      queue: ['no'],
      catalog: ['russia', 'goldfinger', 'thunderball'],
      flow,
      output: ['twice', 'casino1']
    })
    operation.better = 1
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    const no = getVerifiedRankingItem({ ranking, uid: 'no' })
    expect(no.points).toBe(2)
    const russia = getVerifiedRankingItem({ ranking, uid: 'russia' })
    expect(russia.points).toBe(2)
    const goldfinger = getVerifiedRankingItem({ ranking, uid: 'goldfinger' })
    expect(goldfinger.points).toBe(4)
    const thunderball = getVerifiedRankingItem({ ranking, uid: 'thunderball' })
    expect(thunderball.points).toBe(5)
  })

  it('should give output items points equal to the number of preceding output items', () => {
    const flow = createFlow({ uid: 'bond' })
    flow.items = {
      no: { label: 'no', seed: 0, uid: 'no' },
      russia: { label: 'russia', seed: 0, uid: 'russia' },
      goldfinger: { label: 'goldfinger', seed: 0, uid: 'goldfinger' },
      thunderball: { label: 'thunderball', seed: 0, uid: 'thunderball' },
      twice: { label: 'twice', seed: 0, uid: 'twice' }
    }
    const operation = createOperation({
      queue: ['no'],
      catalog: ['russia', 'goldfinger'],
      flow,
      output: ['thunderball', 'twice']
    })
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    const thunderball = getVerifiedRankingItem({ ranking, uid: 'thunderball' })
    expect(thunderball.points).toBe(0)
    const twice = getVerifiedRankingItem({ ranking, uid: 'twice' })
    expect(twice.points).toBe(1)
  })
})

it('should give every item a rank equal to the number of unique point values that are greater than it', () => {
  const flow = createFlow({ uid: 'test' })
  flow.items = {
    a: { label: 'a', seed: 0, uid: 'a' },
    b: { label: 'b', seed: 0, uid: 'b' },
    c: { label: 'c', seed: 0, uid: 'c' },
    d: { label: 'd', seed: 0, uid: 'd' },
    e: { label: 'e', seed: 0, uid: 'e' },
    f: { label: 'f', seed: 0, uid: 'f' },
    g: { label: 'g', seed: 0, uid: 'g' }
  }
  const operation = createOperation({
    queue: ['a', 'b'],
    catalog: ['c', 'd'],
    flow,
    output: ['e', 'f', 'g']
  })
  const addedFlow = addOperation({ flow, operation })
  const ranking = getRanking({ flow: addedFlow })
  const rankingItemA = getVerifiedRankingItem({ ranking, uid: 'a' })
  expect(rankingItemA.rank).toBe(2)
  const rankingItemB = getVerifiedRankingItem({ ranking, uid: 'b' })
  expect(rankingItemB.rank).toBe(1)
  const rankingItemC = getVerifiedRankingItem({ ranking, uid: 'c' })
  expect(rankingItemC.rank).toBe(2)
  const rankingItemD = getVerifiedRankingItem({ ranking, uid: 'd' })
  expect(rankingItemD.rank).toBe(1)
  const rankingItemE = getVerifiedRankingItem({ ranking, uid: 'e' })
  expect(rankingItemE.rank).toBe(5)
  const rankingItemF = getVerifiedRankingItem({ ranking, uid: 'f' })
  expect(rankingItemF.rank).toBe(4)
  const rankingItemG = getVerifiedRankingItem({ ranking, uid: 'g' })
  expect(rankingItemG.rank).toBe(3)
})

it('should sort the ranking items by rank first, then label', () => {
  const flow = createFlow({ uid: 'test' })
  flow.items = {
    a: { label: 'a', seed: 0, uid: 'a' },
    b: { label: 'b', seed: 0, uid: 'b' },
    c: { label: 'c', seed: 0, uid: 'c' },
    d: { label: 'd', seed: 0, uid: 'd' },
    e: { label: 'e', seed: 0, uid: 'e' },
    f: { label: 'f', seed: 0, uid: 'f' },
    g: { label: 'g', seed: 0, uid: 'g' }
  }
  const operation = createOperation({
    queue: ['a', 'b'],
    catalog: ['c', 'd'],
    flow,
    output: ['e', 'f', 'g']
  })
  const addedFlow = addOperation({ flow, operation })
  const ranking = getRanking({ flow: addedFlow })
  expect(ranking[0].uid).toBe('b')
  expect(ranking[1].uid).toBe('d')
  expect(ranking[2].uid).toBe('a')
  expect(ranking[3].uid).toBe('c')
  expect(ranking[4].uid).toBe('g')
  expect(ranking[5].uid).toBe('f')
  expect(ranking[6].uid).toBe('e')
})

import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('catalogQueue', () => {
  function createInitialFlow (): Flow {
    const flow = createFlow({ uid: 'matrix a' })
    flow.items = {
      original: { label: 'original', uid: 'original', seed: 0 },
      reloaded: { label: 'reloaded', uid: 'reloaded', seed: 0 },
      revolutions: { label: 'revolutions', uid: 'revolutions', seed: 0 },
      resurrections: { label: 'resurrections', uid: 'resurrections', seed: 0 },
      enter: { label: 'enter', uid: 'enter', seed: 0 },
      online: { label: 'online', uid: 'online', seed: 0 },
      path: { label: 'path', uid: 'path', seed: 0 },
      awakens: { label: 'awakens', uid: 'awakens', seed: 0 },
      comics: { label: 'comics', uid: 'comics', seed: 0 }
    }
    flow.operations = {
      operation1: {
        catalog: ['original', 'reloaded', 'revolutions', 'resurrections'],
        queue: ['enter', 'online', 'path', 'awakens'],
        output: ['comics'],
        uid: 'operation1'
      }
    }
    return flow
  }

  describe('operation1', () => {
    verifyFlowStep({
      choice: {
        catalog: 'reloaded',
        queue: 'enter'
      },
      createInitialFlow,
      queues: [],
      ranking: [
        { uid: 'awakens', points: 4, rank: 1 },
        { uid: 'resurrections', points: 4, rank: 1 },
        { uid: 'path', points: 3, rank: 2 },
        { uid: 'revolutions', points: 3, rank: 2 },
        { uid: 'online', points: 2, rank: 3 },
        { uid: 'reloaded', points: 2, rank: 3 },
        { uid: 'enter', points: 1, rank: 4 },
        { uid: 'original', points: 1, rank: 4 },
        { uid: 'comics', points: 0, rank: 5 }
      ]
    })
  })

  describe('operation2', () => {
    verifyFlowStep({
      choice: {
        catalog: 'original',
        queue: 'enter'
      },
      createInitialFlow,
      queues: [false],
      ranking: [
        { uid: 'resurrections', points: 5, rank: 1 },
        { uid: 'awakens', points: 4, rank: 2 },
        { uid: 'revolutions', points: 4, rank: 2 },
        { uid: 'path', points: 3, rank: 3 },
        { uid: 'reloaded', points: 3, rank: 3 },
        { uid: 'online', points: 2, rank: 4 },
        { uid: 'enter', points: 1, rank: 5 },
        { uid: 'original', points: 1, rank: 5 },
        { uid: 'comics', points: 0, rank: 6 }
      ]
    })
  })

  describe('operation3', () => {
    verifyFlowStep({
      choice: {
        catalog: 'path',
        queue: 'reloaded'
      },
      createInitialFlow,
      queues: [false, true],
      ranking: [
        { uid: 'awakens', points: 5, rank: 1 },
        { uid: 'resurrections', points: 5, rank: 1 },
        { uid: 'path', points: 4, rank: 2 },
        { uid: 'revolutions', points: 4, rank: 2 },
        { uid: 'online', points: 3, rank: 3 },
        { uid: 'reloaded', points: 3, rank: 3 },
        { uid: 'enter', points: 2, rank: 4 },
        { uid: 'original', points: 1, rank: 5 },
        { uid: 'comics', points: 0, rank: 6 }
      ]
    })
  })

  describe('operation4', () => {
    verifyFlowStep({
      choice: {
        catalog: 'online',
        queue: 'reloaded'
      },
      createInitialFlow,
      queues: [false, true, false],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'resurrections', points: 5, rank: 2 },
        { uid: 'revolutions', points: 4, rank: 3 },
        { uid: 'online', points: 3, rank: 4 },
        { uid: 'reloaded', points: 3, rank: 4 },
        { uid: 'enter', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation5', () => {
    verifyFlowStep({
      choice: {
        catalog: 'revolutions',
        queue: 'path'
      },
      createInitialFlow,
      queues: [false, true, false, true],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'resurrections', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'revolutions', points: 5, rank: 2 },
        { uid: 'reloaded', points: 4, rank: 3 },
        { uid: 'online', points: 3, rank: 4 },
        { uid: 'enter', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation6', () => {
    verifyFlowStep({
      choice: {
        catalog: 'revolutions',
        queue: 'awakens'
      },
      createInitialFlow,
      queues: [false, true, false, true, false],
      ranking: [
        { uid: 'resurrections', points: 7, rank: 1 },
        { uid: 'awakens', points: 6, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 2 },
        { uid: 'path', points: 5, rank: 3 },
        { uid: 'reloaded', points: 4, rank: 4 },
        { uid: 'online', points: 3, rank: 5 },
        { uid: 'enter', points: 2, rank: 6 },
        { uid: 'original', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation7', () => {
    verifyFlowStep({
      choice: {
        catalog: 'awakens',
        queue: 'resurrections'
      },
      createInitialFlow,
      queues: [false, true, false, true, false, true],
      ranking: [
        { uid: 'awakens', points: 7, rank: 1 },
        { uid: 'resurrections', points: 7, rank: 1 },
        { uid: 'revolutions', points: 6, rank: 2 },
        { uid: 'path', points: 5, rank: 3 },
        { uid: 'reloaded', points: 4, rank: 4 },
        { uid: 'online', points: 3, rank: 5 },
        { uid: 'enter', points: 2, rank: 6 },
        { uid: 'original', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation8', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow,
      queues: [false, true, false, true, false, true, false],
      ranking: [
        { uid: 'awakens', points: 8, rank: 1 },
        { uid: 'resurrections', points: 7, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 3 },
        { uid: 'path', points: 5, rank: 4 },
        { uid: 'reloaded', points: 4, rank: 5 },
        { uid: 'online', points: 3, rank: 6 },
        { uid: 'enter', points: 2, rank: 7 },
        { uid: 'original', points: 1, rank: 8 },
        { uid: 'comics', points: 0, rank: 9 }
      ]
    })
  })
})

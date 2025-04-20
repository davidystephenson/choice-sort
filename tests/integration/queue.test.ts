import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('queue', () => {
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

  // describe('operation1', () => {
  //   verifyFlowStep({
  //     choice: {
  //       catalog: 'reloaded',
  //       queue: 'enter'
  //     },
  //     createInitialFlow,
  //     queues: [],
  //     ranking: [
  //       { uid: 'awakens', points: 4, rank: 1 },
  //       { uid: 'resurrections', points: 4, rank: 1 },
  //       { uid: 'path', points: 3, rank: 2 },
  //       { uid: 'revolutions', points: 3, rank: 2 },
  //       { uid: 'online', points: 2, rank: 3 },
  //       { uid: 'reloaded', points: 2, rank: 3 },
  //       { uid: 'enter', points: 1, rank: 4 },
  //       { uid: 'original', points: 1, rank: 4 },
  //       { uid: 'comics', points: 0, rank: 5 }
  //     ]
  //   })
  // })

  describe('operation2', () => {
    verifyFlowStep({
      choice: {
        catalog: 'online',
        queue: 'revolutions'
      },
      createInitialFlow,
      queues: [true],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'online', points: 4, rank: 3 },
        { uid: 'resurrections', points: 4, rank: 3 },
        { uid: 'enter', points: 3, rank: 4 },
        { uid: 'revolutions', points: 3, rank: 4 },
        { uid: 'reloaded', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation3', () => {
    verifyFlowStep({
      choice: {
        catalog: 'revolutions',
        queue: 'path'
      },
      createInitialFlow,
      queues: [true, true],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'resurrections', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'revolutions', points: 5, rank: 2 },
        { uid: 'online', points: 4, rank: 3 },
        { uid: 'enter', points: 3, rank: 4 },
        { uid: 'reloaded', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation4', () => {
    verifyFlowStep({
      choice: {
        catalog: 'path',
        queue: 'resurrections'
      },
      createInitialFlow,
      queues: [true, true, true],
      ranking: [
        { uid: 'awakens', points: 7, rank: 1 },
        { uid: 'path', points: 6, rank: 2 },
        { uid: 'resurrections', points: 6, rank: 2 },
        { uid: 'revolutions', points: 5, rank: 3 },
        { uid: 'online', points: 4, rank: 4 },
        { uid: 'enter', points: 3, rank: 5 },
        { uid: 'reloaded', points: 2, rank: 6 },
        { uid: 'original', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation5', () => {
    verifyFlowStep({
      choice: {
        catalog: 'resurrections',
        queue: 'awakens'
      },
      createInitialFlow,
      queues: [true, true, true, true],
      ranking: [
        { uid: 'awakens', points: 7, rank: 1 },
        { uid: 'resurrections', points: 7, rank: 1 },
        { uid: 'path', points: 6, rank: 2 },
        { uid: 'revolutions', points: 5, rank: 3 },
        { uid: 'online', points: 4, rank: 4 },
        { uid: 'enter', points: 3, rank: 5 },
        { uid: 'reloaded', points: 2, rank: 6 },
        { uid: 'original', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation6', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow,
      queues: [true, true, true, true, true],
      ranking: [
        { uid: 'awakens', points: 8, rank: 1 },
        { uid: 'resurrections', points: 7, rank: 2 },
        { uid: 'path', points: 6, rank: 3 },
        { uid: 'revolutions', points: 5, rank: 4 },
        { uid: 'online', points: 4, rank: 5 },
        { uid: 'enter', points: 3, rank: 6 },
        { uid: 'reloaded', points: 2, rank: 7 },
        { uid: 'original', points: 1, rank: 8 },
        { uid: 'comics', points: 0, rank: 9 }
      ]
    })
  })
})

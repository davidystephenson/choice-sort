import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('longCatalog', () => {
  function createInitialFlow (): Flow {
    const flow = createFlow({ uid: 'bond' })
    flow.items = {
      russia: { label: 'russia', uid: 'russia', seed: 0 },
      goldfinger: { label: 'goldfinger', uid: 'goldfinger', seed: 0 },
      thunderball: { label: 'thunderball', uid: 'thunderball', seed: 0 },
      twice: { label: 'twice', uid: 'twice', seed: 0 },
      casino1: { label: 'casino1', uid: 'casino1', seed: 0 },
      service: { label: 'service', uid: 'service', seed: 0 },
      diamonds: { label: 'diamonds', uid: 'diamonds', seed: 0 },
      live: { label: 'live', uid: 'live', seed: 0 },
      golden: { label: 'golden', uid: 'golden', seed: 0 },
      loved: { label: 'loved', uid: 'loved', seed: 0 },
      moonraker: { label: 'moonraker', uid: 'moonraker', seed: 0 },
      eyes: { label: 'eyes', uid: 'eyes', seed: 0 },
      octopussy: { label: 'octopussy', uid: 'octopussy', seed: 0 },
      never: { label: 'never', uid: 'never', seed: 0 },
      view: { label: 'view', uid: 'view', seed: 0 },
      daylights: { label: 'daylights', uid: 'daylights', seed: 0 },
      license: { label: 'license', uid: 'license', seed: 0 },
      goldeneye: { label: 'goldeneye', uid: 'goldeneye', seed: 0 },
      tomorrow: { label: 'tomorrow', uid: 'tomorrow', seed: 0 },
      world: { label: 'world', uid: 'world', seed: 0 },
      die: { label: 'die', uid: 'die', seed: 0 },
      casino2: { label: 'casino2', uid: 'casino2', seed: 0 },
      quantum: { label: 'quantum', uid: 'quantum', seed: 0 },
      skyfall: { label: 'skyfall', uid: 'skyfall', seed: 0 },
      spectre: { label: 'spectre', uid: 'spectre', seed: 0 },
      time: { label: 'time', uid: 'time', seed: 0 },
      no: { label: 'no', uid: 'no', seed: 0 },
      cuaron: { label: 'cuaron', uid: 'cuaron', seed: 0 }
    }
    flow.operations = {
      operation1: {
        catalog: [
          'russia', 'goldfinger', 'thunderball', 'twice', 'casino1',
          'service', 'diamonds', 'live', 'golden', 'loved',
          'moonraker', 'eyes', 'octopussy', 'never', 'view',
          'daylights', 'license', 'goldeneye', 'tomorrow', 'world',
          'die', 'casino2', 'quantum', 'skyfall', 'spectre', 'time'
        ],
        queue: ['no'],
        output: ['cuaron'],
        uid: 'operation1'
      }
    }
    return flow
  }

  describe('operation1', () => {
    verifyFlowStep({
      choice: {
        catalog: 'octopussy',
        queue: 'no'
      },
      createInitialFlow,
      queues: [],
      ranking: [
        { uid: 'time', points: 26, rank: 1 },
        { uid: 'spectre', points: 25, rank: 2 },
        { uid: 'skyfall', points: 24, rank: 3 },
        { uid: 'quantum', points: 23, rank: 4 },
        { uid: 'casino2', points: 22, rank: 5 },
        { uid: 'die', points: 21, rank: 6 },
        { uid: 'world', points: 20, rank: 7 },
        { uid: 'tomorrow', points: 19, rank: 8 },
        { uid: 'goldeneye', points: 18, rank: 9 },
        { uid: 'license', points: 17, rank: 10 },
        { uid: 'daylights', points: 16, rank: 11 },
        { uid: 'view', points: 15, rank: 12 },
        { uid: 'never', points: 14, rank: 13 },
        { uid: 'octopussy', points: 13, rank: 14 },
        { uid: 'eyes', points: 12, rank: 15 },
        { uid: 'moonraker', points: 11, rank: 16 },
        { uid: 'loved', points: 10, rank: 17 },
        { uid: 'golden', points: 9, rank: 18 },
        { uid: 'live', points: 8, rank: 19 },
        { uid: 'diamonds', points: 7, rank: 20 },
        { uid: 'service', points: 6, rank: 21 },
        { uid: 'casino1', points: 5, rank: 22 },
        { uid: 'twice', points: 4, rank: 23 },
        { uid: 'thunderball', points: 3, rank: 24 },
        { uid: 'goldfinger', points: 2, rank: 25 },
        { uid: 'no', points: 1, rank: 26 },
        { uid: 'russia', points: 1, rank: 26 },
        { uid: 'cuaron', points: 0, rank: 27 }
      ]
    })
  })

  describe('operation2', () => {
    verifyFlowStep({
      choice: {
        catalog: 'diamonds',
        queue: 'no'
      },
      createInitialFlow,
      queues: [false],
      ranking: [
        { uid: 'time', points: 27, rank: 1 },
        { uid: 'spectre', points: 26, rank: 2 },
        { uid: 'skyfall', points: 25, rank: 3 },
        { uid: 'quantum', points: 24, rank: 4 },
        { uid: 'casino2', points: 23, rank: 5 },
        { uid: 'die', points: 22, rank: 6 },
        { uid: 'world', points: 21, rank: 7 },
        { uid: 'tomorrow', points: 20, rank: 8 },
        { uid: 'goldeneye', points: 19, rank: 9 },
        { uid: 'license', points: 18, rank: 10 },
        { uid: 'daylights', points: 17, rank: 11 },
        { uid: 'view', points: 16, rank: 12 },
        { uid: 'never', points: 15, rank: 13 },
        { uid: 'octopussy', points: 14, rank: 14 },
        { uid: 'eyes', points: 12, rank: 15 },
        { uid: 'moonraker', points: 11, rank: 16 },
        { uid: 'loved', points: 10, rank: 17 },
        { uid: 'golden', points: 9, rank: 18 },
        { uid: 'live', points: 8, rank: 19 },
        { uid: 'diamonds', points: 7, rank: 20 },
        { uid: 'service', points: 6, rank: 21 },
        { uid: 'casino1', points: 5, rank: 22 },
        { uid: 'twice', points: 4, rank: 23 },
        { uid: 'thunderball', points: 3, rank: 24 },
        { uid: 'goldfinger', points: 2, rank: 25 },
        { uid: 'no', points: 1, rank: 26 },
        { uid: 'russia', points: 1, rank: 26 },
        { uid: 'cuaron', points: 0, rank: 27 }
      ]
    })
  })

  describe('operation3', () => {
    verifyFlowStep({
      choice: {
        catalog: 'twice',
        queue: 'no'
      },
      createInitialFlow,
      queues: [false, false],
      ranking: [
        { uid: 'time', points: 27, rank: 1 },
        { uid: 'spectre', points: 26, rank: 2 },
        { uid: 'skyfall', points: 25, rank: 3 },
        { uid: 'quantum', points: 24, rank: 4 },
        { uid: 'casino2', points: 23, rank: 5 },
        { uid: 'die', points: 22, rank: 6 },
        { uid: 'world', points: 21, rank: 7 },
        { uid: 'tomorrow', points: 20, rank: 8 },
        { uid: 'goldeneye', points: 19, rank: 9 },
        { uid: 'license', points: 18, rank: 10 },
        { uid: 'daylights', points: 17, rank: 11 },
        { uid: 'view', points: 16, rank: 12 },
        { uid: 'never', points: 15, rank: 13 },
        { uid: 'octopussy', points: 14, rank: 14 },
        { uid: 'eyes', points: 13, rank: 15 },
        { uid: 'moonraker', points: 12, rank: 16 },
        { uid: 'loved', points: 11, rank: 17 },
        { uid: 'golden', points: 10, rank: 18 },
        { uid: 'live', points: 9, rank: 19 },
        { uid: 'diamonds', points: 8, rank: 20 },
        { uid: 'service', points: 6, rank: 21 },
        { uid: 'casino1', points: 5, rank: 22 },
        { uid: 'twice', points: 4, rank: 23 },
        { uid: 'thunderball', points: 3, rank: 24 },
        { uid: 'goldfinger', points: 2, rank: 25 },
        { uid: 'no', points: 1, rank: 26 },
        { uid: 'russia', points: 1, rank: 26 },
        { uid: 'cuaron', points: 0, rank: 27 }
      ]
    })
  })

  describe('operation4', () => {
    verifyFlowStep({
      choice: {
        catalog: 'goldfinger',
        queue: 'no'
      },
      createInitialFlow,
      queues: [false, false, false],
      ranking: [
        { uid: 'time', points: 27, rank: 1 },
        { uid: 'spectre', points: 26, rank: 2 },
        { uid: 'skyfall', points: 25, rank: 3 },
        { uid: 'quantum', points: 24, rank: 4 },
        { uid: 'casino2', points: 23, rank: 5 },
        { uid: 'die', points: 22, rank: 6 },
        { uid: 'world', points: 21, rank: 7 },
        { uid: 'tomorrow', points: 20, rank: 8 },
        { uid: 'goldeneye', points: 19, rank: 9 },
        { uid: 'license', points: 18, rank: 10 },
        { uid: 'daylights', points: 17, rank: 11 },
        { uid: 'view', points: 16, rank: 12 },
        { uid: 'never', points: 15, rank: 13 },
        { uid: 'octopussy', points: 14, rank: 14 },
        { uid: 'eyes', points: 13, rank: 15 },
        { uid: 'moonraker', points: 12, rank: 16 },
        { uid: 'loved', points: 11, rank: 17 },
        { uid: 'golden', points: 10, rank: 18 },
        { uid: 'live', points: 9, rank: 19 },
        { uid: 'diamonds', points: 8, rank: 20 },
        { uid: 'service', points: 7, rank: 21 },
        { uid: 'casino1', points: 6, rank: 22 },
        { uid: 'twice', points: 5, rank: 23 },
        { uid: 'thunderball', points: 3, rank: 24 },
        { uid: 'goldfinger', points: 2, rank: 25 },
        { uid: 'no', points: 1, rank: 26 },
        { uid: 'russia', points: 1, rank: 26 },
        { uid: 'cuaron', points: 0, rank: 27 }
      ]
    })
  })

  describe('operation5', () => {
    verifyFlowStep({
      choice: {
        catalog: 'russia',
        queue: 'no'
      },
      createInitialFlow,
      queues: [false, false, false, false],
      ranking: [
        { uid: 'time', points: 27, rank: 1 },
        { uid: 'spectre', points: 26, rank: 2 },
        { uid: 'skyfall', points: 25, rank: 3 },
        { uid: 'quantum', points: 24, rank: 4 },
        { uid: 'casino2', points: 23, rank: 5 },
        { uid: 'die', points: 22, rank: 6 },
        { uid: 'world', points: 21, rank: 7 },
        { uid: 'tomorrow', points: 20, rank: 8 },
        { uid: 'goldeneye', points: 19, rank: 9 },
        { uid: 'license', points: 18, rank: 10 },
        { uid: 'daylights', points: 17, rank: 11 },
        { uid: 'view', points: 16, rank: 12 },
        { uid: 'never', points: 15, rank: 13 },
        { uid: 'octopussy', points: 14, rank: 14 },
        { uid: 'eyes', points: 13, rank: 15 },
        { uid: 'moonraker', points: 12, rank: 16 },
        { uid: 'loved', points: 11, rank: 17 },
        { uid: 'golden', points: 10, rank: 18 },
        { uid: 'live', points: 9, rank: 19 },
        { uid: 'diamonds', points: 8, rank: 20 },
        { uid: 'service', points: 7, rank: 21 },
        { uid: 'casino1', points: 6, rank: 22 },
        { uid: 'twice', points: 5, rank: 23 },
        { uid: 'thunderball', points: 4, rank: 24 },
        { uid: 'goldfinger', points: 3, rank: 25 },
        { uid: 'no', points: 1, rank: 26 },
        { uid: 'russia', points: 1, rank: 26 },
        { uid: 'cuaron', points: 0, rank: 27 }
      ]
    })
  })

  describe('operation6', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow,
      queues: [false, false, false, false, false],
      ranking: [
        { uid: 'time', points: 27, rank: 1 },
        { uid: 'spectre', points: 26, rank: 2 },
        { uid: 'skyfall', points: 25, rank: 3 },
        { uid: 'quantum', points: 24, rank: 4 },
        { uid: 'casino2', points: 23, rank: 5 },
        { uid: 'die', points: 22, rank: 6 },
        { uid: 'world', points: 21, rank: 7 },
        { uid: 'tomorrow', points: 20, rank: 8 },
        { uid: 'goldeneye', points: 19, rank: 9 },
        { uid: 'license', points: 18, rank: 10 },
        { uid: 'daylights', points: 17, rank: 11 },
        { uid: 'view', points: 16, rank: 12 },
        { uid: 'never', points: 15, rank: 13 },
        { uid: 'octopussy', points: 14, rank: 14 },
        { uid: 'eyes', points: 13, rank: 15 },
        { uid: 'moonraker', points: 12, rank: 16 },
        { uid: 'loved', points: 11, rank: 17 },
        { uid: 'golden', points: 10, rank: 18 },
        { uid: 'live', points: 9, rank: 19 },
        { uid: 'diamonds', points: 8, rank: 20 },
        { uid: 'service', points: 7, rank: 21 },
        { uid: 'casino1', points: 6, rank: 22 },
        { uid: 'twice', points: 5, rank: 23 },
        { uid: 'thunderball', points: 4, rank: 24 },
        { uid: 'goldfinger', points: 3, rank: 25 },
        { uid: 'russia', points: 2, rank: 26 },
        { uid: 'no', points: 1, rank: 27 },
        { uid: 'cuaron', points: 0, rank: 28 }
      ]
    })
  })
})

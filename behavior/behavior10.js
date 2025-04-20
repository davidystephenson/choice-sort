export const operation1 = {
  aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
  bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
  output: ['comics']
}
// aIndex: 0
// bIndex: 2
// a: original
// b: online

// 1. awakens: 5
// 2. animatrix: 4
// 2. path: 4
// 3. online: 3
// 4. revolutions: 3
// 5. enter: 2
// 5. reloaded: 2
// 6. original: 1
// 6. revisited: 1
// 7. comics: 0

// User chooses B

export const operation2 = {
  aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
  bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
  output: ['comics']
}
// bIndex: 0
// a: original
// b: revisited

// User chooses A

export const operation3 = {
  aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
  bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
  output: ['comics']
}
// bIndex: 0
// a: original
// b: enter

// User chooses B

export const operation4 = {
  aInput: ['online', 'path', 'awakens'],
  better: undefined,
  bInput: ['reloaded', 'revolutions', 'animatrix'],
  output: ['comics', 'original'],
  worse: 3
}
// bIndex: 0
// a: revisited
// b: reloaded

// 1. awakens: 6
// 2. path: 5
// 3. animatrix: 4
// 3. online: 4
// 4. enter: 3
// 4. revolutions: 3
// 7. reloaded: 2
// 8. revisited: 2
// 9. original: 1
// 10. comics: 0

// User chooses B

export const operation5 = {
  aInput: ['revolutions', 'animatrix'],
  better: undefined,
  bInput: ['enter', 'online', 'path', 'awakens'],
  output: ['comics', 'original', 'revisited', 'reloaded'],
  worse: undefined
}
// bIndex: 3
// a: revolutions
// b: awakens

// 1. awakens: 7
// 2. path: 6
// 3. animatrix: 5
// 3. online: 5
// 4. enter: 4
// 4. revolutions: 4
// 5. reloaded: 3
// 6. revisited: 2
// 7. original: 1
// 8. comics: 0

// User chooses B

export const operation6 = {
  aInput: ['revolutions', 'animatrix'],
  better: undefined,
  bInput: ['enter', 'online', 'path', 'awakens'],
  output: ['comics', 'original', 'revisited', 'reloaded'],
  worse: 3
}
// bIndex: 0
// a: revolutions
// b: enter

// 1. awakens: 7
// 2. path: 6
// 3. animatrix: 5
// 3. online: 5
// 4. enter: 4
// 4. revolutions: 4
// 5. reloaded: 3
// 6. revisited: 2
// 7. original: 1
// 8. comics: 0

// User chooses B

export const operation7 = {
  aInput: ['reloaded', 'revolutions', 'animatrix'],
  better: undefined,
  bInput: ['enter', 'online', 'path', 'awakens'],
  output: ['comics', 'original', 'revisited'],
  worse: 3
}
// bIndex: 0
// a: reloaded

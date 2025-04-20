export const operation1 = {
  aInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix'],
  better: undefined,
  bInput: ['enter', 'online', 'path', 'awakens'],
  output: ['original'],
  worse: undefined
}
// index 0
// a: reloaded
// b: enter
// User chooses b

export const operation2 = {
  aInput: ['enter', 'online', 'path', 'awakens'],
  better: 0,
  bInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix'],
  output: ['original'],
  worse: undefined
}
// index 3
// a: enter
// b: animatrix
// User chooses b

export const operation3 = {
  aInput: ['enter', 'online', 'path', 'awakens'],
  better: 0,
  bInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix'],
  output: ['original'],
  worse: 3
}
// index 1
// a: enter
// b: revolutions
// User chooses b

export const operation4 = {
  aInput: ['enter', 'online', 'path', 'awakens'],
  better: 1,
  bInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix'],
  output: ['original'],
  worse: 3
}
// index 2
// a: enter
// b: resurrections
// User chooses b

export const operation5 = {
  aInput: ['animatrix'],
  better: undefined,
  bInput: ['online', 'path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'enter'],
  worse: undefined
}
// index 0
// a: animatrix
// b: online
// User chooses a

export const operation6 = {
  aInput: ['animatrix'],
  better: 0,
  bInput: ['online', 'path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'resurrections'],
  worse: undefined
}
// index 2
// a: animatrix
// b: awakens
// User chooses a

export const operation7 = {
  aInput: ['animatrix'],
  better: 0,
  bInput: ['online', 'path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'resurrections'],
  worse: 2
}
// index 1
// a: animatrix
// b: path
// User chooses a

export const operation8 = {
  aInput: [],
  better: undefined,
  bInput: [],
  output: ['original', 'reloaded', 'revolutions', 'resurrections', 'online', 'path', 'animatrix', 'awakens'],
  worse: undefined
}

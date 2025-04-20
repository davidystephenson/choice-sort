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
  aInput: ['resurrections', 'animatrix'],
  better: undefined,
  bInput: ['online', 'path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'enter'],
  worse: undefined
}
// index 0
// a: resurrections
// b: online
// User chooses b

export const operation6 = {
  aInput: ['online', 'path', 'awakens'],
  better: 0,
  bInput: ['resurrections', 'animatrix'],
  output: ['original', 'reloaded', 'revolutions', 'enter'],
  worse: undefined
}
// index 0
// a: online
// b: animatrix
// User chooses b

export const operation7 = {
  aInput: ['animatrix'],
  better: undefined,
  bInput: ['path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'enter', 'resurrections', 'online'],
  worse: undefined
}
// index 0
// a: animatrix
// b: path
// User chooses b

export const operation8 = {
  aInput: ['animatrix'],
  better: undefined,
  bInput: ['path', 'awakens'],
  output: ['original', 'reloaded', 'revolutions', 'enter', 'resurrections', 'online', 'animatrix', 'path', 'awakens'],
  worse: undefined
}

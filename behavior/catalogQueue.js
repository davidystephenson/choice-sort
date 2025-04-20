export const operation1 = {
  better: undefined,
  catalog: ['original', 'reloaded', 'revolutions', 'resurrections'],
  output: ['comics'],
  queue: ['enter', 'online', 'path', 'awakens']
}
/*
CHOICE
index: 1
catalog: reloaded
queue: enter

RANKING
1. awakens: 4
1. resurrections: 4
2. path: 3
2. revolutions: 3
3. online: 2
3. reloaded: 2
4. enter: 1
4. original: 1
5. comics: 0

User chooses catalog
*/

export const operation2 = {
  better: 1,
  catalog: ['original', 'reloaded', 'revolutions', 'resurrections'],
  output: ['comics'],
  queue: ['enter', 'online', 'path', 'awakens']
}
/*
CHOICE
index: 0
catalog: original
queue: enter

RANKING
1. resurrections: 5
2. awakens: 4
2. revolutions: 4
3. path: 3
3. reloaded: 3
4. online: 2
5. enter: 1
5. original: 1
6. comics: 0

User chooses queue
*/

export const operation3 = {
  better: undefined,
  catalog: ['online', 'path', 'awakens'],
  output: ['comics', 'original', 'enter'],
  queue: ['reloaded', 'revolutions', 'resurrections']
}
/*
CHOICE
index: 1
catalog: path
queue: reloaded

RANKING
1. awakens: 5,
1. resurrections: 5.
2. path: 4,
2. revolutions: 4
3. online: 3
3. reloaded: 3
4. enter: 2
5. original: 1
6. comics: 0

User chooses catalog
*/

export const operation4 = {
  better: 1,
  catalog: ['online', 'path', 'awakens'],
  output: ['comics', 'original', 'enter'],
  queue: ['reloaded', 'revolutions', 'resurrections']
}
/*
CHOICE
index: 0
catalog: online
queue: reloaded

RANKING
1. awakens: 6,
2. path: 5,
2. resurrections: 5.
3. revolutions: 4
4. online: 3
4. reloaded: 3
5. enter: 2
6. original: 1
7. comics: 0

User chooses queue
*/

export const operation5 = {
  better: undefined,
  catalog: ['revolutions', 'resurrections'],
  output: ['comics', 'original', 'enter', 'online', 'reloaded'],
  queue: ['path', 'awakens']
}
/*
CHOICE
index: 0
catalog: revolutions
queue: path

RANKING
1. awakens: 6
1. resurrections: 6
2. path: 5
2. revolutions: 5
3. reloaded: 4
4. online: 3
5. enter: 2
6. original: 1
7. comics: 0

User chooses catalog
*/

export const operation6 = {
  better: undefined,
  catalog: ['revolutions', 'resurrections'],
  output: ['comics', 'original', 'enter', 'online', 'reloaded', 'path'],
  queue: ['awakens']
}
/*
CHOICE
index: 0
catalog: revolutions
queue: awakens

RANKING
1. resurrections: 7
2. awakens: 6
2. revolutions: 6
3. path: 5
4. reloaded: 4
5. online: 3
6. enter: 2
7. original: 1
8. comics: 0

User chooses queue
*/

export const operation7 = {
  better: undefined,
  catalog: ['awakens'],
  output: ['comics', 'original', 'enter', 'online', 'reloaded', 'path', 'revolutions'],
  queue: ['resurrections']
}
/*
CHOICE
index: 0
catalog: awakens
queue: resurrections

RANKING
1. awakens: 7
1. resurrections: 7
2. revolutions: 6
3. path: 5
4. reloaded: 4
5. online: 3
6. enter: 2
7. original: 1
8. comics: 0

User chooses catalog
*/

export const operation8 = {
  better: undefined,
  catalog: [],
  output: ['comics', 'original', 'enter', 'online', 'reloaded', 'path', 'revolutions', 'resurrections', 'awakens'],
  queue: []
}
/*
complete

RANKING
1. awakens: 8
2. resurrections: 7
3. revolutions: 6
4. path: 5
5. reloaded: 4
6. online: 3
7. enter: 2
8. original: 1
9. comics: 0
*/

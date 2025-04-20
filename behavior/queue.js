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

User chooses queue
*/

export const operation2 = {
  better: undefined,
  catalog: ['enter', 'online', 'path', 'awakens'],
  output: ['comics', 'original', 'reloaded'],
  queue: ['revolutions', 'resurrections']
}
/*
CHOICE
index: 1
catalog: online
queue: revolutions

RANKING
1. awakens: 6
2. path: 5
3. online: 4
3. resurrections: 4
4. enter: 3
4. revolutions: 3
5. reloaded: 2
6. original: 1
7. comics: 0

User chooses queue
*/

export const operation3 = {
  better: undefined,
  catalog: ['revolutions', 'resurrections'],
  output: ['comics', 'original', 'reloaded', 'enter', 'online'],
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
3. online: 4
4. enter: 3
5. reloaded: 2
6. original: 1
7. comics: 0

User chooses queue
*/

export const operation4 = {
  better: undefined,
  catalog: ['path', 'awakens'],
  output: ['comics', 'original', 'reloaded', 'enter', 'online', 'revolutions'],
  queue: ['resurrections']
}
/*
CHOICE
index: 0
catalog: path
queue: resurrections

RANKING
1. awakens: 7
2. path: 6
2. resurrections: 6
3. revolutions: 5
4. online: 4
5. enter: 3
6. reloaded: 2
7. original: 1
8. comics: 0

User chooses queue
*/

export const operation5 = {
  better: undefined,
  catalog: ['resurrections'],
  output: ['comics', 'original', 'reloaded', 'enter', 'online', 'revolutions', 'path'],
  queue: ['awakens']
}
/*
CHOICE
index: 0
catalog: resurrections
queue: awakens

RANKING
1. awakens: 7
1. resurrections: 7
2. path: 6
3. revolutions: 5
4. online: 4
5. enter: 3
6. reloaded: 2
7. original: 1
8. comics: 0

User chooses queue
*/

export const operation6 = {
  better: undefined,
  catalog: [],
  output: ['comics', 'original', 'reloaded', 'enter', 'online', 'revolutions', 'path', 'resurrections', 'awakens'],
  queue: []
}
/*
complete

RANKING
1. awakens: 8
2. resurrections: 7
3. path: 6
4. revolutions: 5
5. online: 4
6. enter: 3
7. reloaded: 2
8. original: 1
9. comics: 0
*/

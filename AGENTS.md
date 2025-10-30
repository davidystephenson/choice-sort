# Agent Rules and Guidelines

This document contains comprehensive rules and guidelines for working with this codebase. All agents and developers should follow these guidelines when making changes to the project.

## 01. Follow the Notes

- The files in numbered order in the top level `.notes` directory define the project strategy.
- Read all of these files very carefully at the start of each interaction.
- If you see an issue with the strategy, stop and ask for help.

## 02. Thoroughness

- Always implement all requested functionality
- Never write code that is unneccessary to complete the task
- Never leave todos, placeholders or missing pieces
- Never ask for permission to run commands or apply changes
- If you think there might not be a correct answer, say so
- If you do not know the answer, stop and ask for help instead of guessing
- Always verify information before presenting it
- Do not make assumptions or speculate without clear evidence
- Always consider and handle potential edge cases
- Never ignore errors or warning
- Always fix all issues when you become aware of them

## 03. NPM Package Management

- Always use the `npm` command to handle NPM package management.
- Always add needed packages with `npm install`
- Always remove unused packages with `npm uninstall`

## 04. TypeScript

- Use TypeScript for all code
- Implement proper type safety and inference
- Prefer interfaces over types
- Avoid TypeScript enums, use const maps instead (Zod `z.enums` are fine)
- Use guard clauses that throw errors to check types when logically necessary
- Never use type assertions like the `as` keywords except for making values readonly with `as const`
- Never use the unsafe `any` type, use the `unknown` type and generic type parameters are encouraged
- Never use custom type guards, as their internal logic is not type safe
- Never use the `!` operator to avoid type checking if a value is defined
- Always annotate implicit `any`s with a safe type, use `unknown` if necessary
- Check each file carefully for import and type issues
- Prefer named types:

```ts
// BAD - Unnecessary inline type
const user: { id: number, name: string } = { id: 1, name: 'zelda' }

// GOOD - Named type
interface User {
  id: number
  name: string
}
const user: User = { id: 1, name: 'zelda' }
```

## 05. Clean Code

- Always write functional and declarative programming patterns
- Never use classes
- Always write DRY (Don't Repeat Yourself) code
- Prefer lines under 70 characters long, except for template literals.
- Omit semicolons unless syntactically necessary.
- Always use `async`/`await` for handling asynchronous logic.
- Never use `.then` syntax for handing promises. 
- Prefer `if` statements:

```ts
// BAD - Could use `if` without changing logic
return single
  ? importSingleItem({ flow: baseFlow, item: props.items[0] })
  : importMultipleItems({ flow: baseFlow, items: props.items })

// GOOD - Uses `if`
if (single) {
  return importSingleItem({ flow: baseFlow, item: props.items[0] })
}
return importMultipleItems({ flow: baseFlow, items: props.items })
```

- Never use string addition, use template literals instead:

```ts
const first = 'abc'
cosnt last = 'xyz'

// BAD - String addition
const letters = first + last

// GOOD - Template literal
const letters = `${first}${last}`
```

- Never use `switch`/`case` blocks, use `if` instead to keep code flexible:

```ts
// BAD - `switch`/`case`
switch (input.type) {
  case 'boolean': {
    return { type: 'boolean' }
  }
  case 'text': {
    return { type: 'text'}
  }
  default: {
    throw new Error('Invalid type')
  }
}

// GOOD - `if`
if (type === 'boolean') {
  return { type: 'boolean' }
}
if (type === 'text') {
  return { type: 'text' }
}
throw new Error('Invalid type')
```

- Prefer `== null` to detect nullish values:

```ts
// BAD - `=== undefined`
export default function createFlow (props: { seed: Uid }): Flow {
  if (props.seed === undefined) {
    throw new Error('Seed is required')
  }
  return { seed }
}

// BAD - `=== null`
export default function createFlow (props: { seed: Uid }): Flow {
  if (props.seed === null) {
    throw new Error('Seed is required')
  }
  return { seed }
}

// GOOD - `== null`
export default function createFlow (props: { seed: Uid }): Flow {
  if (props.seed == null) {
    throw new Error('Seed is required')
  }
  return { seed }
}
```

- Avoid destructing:

```ts
// BAD - Unnecessary destructuring
const user = { id: 1, username: "zelda" }
const { id, email } = user
console.info(id)
console.info(email)

// GOOD - Avoid destructuring
const user = { id: 1, username: "zelda" }
console.info(user.id)
console.info(user.email)
```

- Never return objects literals from arrow functions with parentheses, alwayse use an explicit return statement:

```ts
// BAD - Object returned in expression without function body
const docs = ids.map(id => ({ id, date: new Date() }))

// GOOD - Object returned in function with body and explicit return
const docs = ids.map(id => {
  return { id, date: new Date() }
})
```

- Always export individual types or variables inline, do not create unnecessary export structures:

```ts
// BAD - unecessary export structures
const baseSchema = z.object({ id: z.string() })
const ownerSchema = z.object({ ownerId: z.string() })
export {
  baseSchema,
  ownerSchema
}

// GOOD - Individual inline exports
export const baseSchema = z.object({ id: z.string() })
export const ownerSchema = z.object({ ownerId: z.string() })

// BAD - Unnecessary re-export structure
import { thing } from './thing'
export { thing }

// GOOD - Direct re-export
export { thing } from './thing'
```

## 06. Avoid Let Variables

- Avoid `let` variables, because immutable code is easier to reason about and less prone to bugs:

```ts
// BAD - Using let for accumulation
let result = []
for (const item of items) {
  result.push(processItem(item))
}

// GOOD - Use functional methods
const result = items.map(processItem)

// BAD - Complex accumulation with let
let total = 0
let count = 0
for (const score of scores) {
  total += score
  count++
}
let average = total / count

// GOOD - Use reduce for complex accumulation
interface Result {
  total: number
  count: number
}
const result = scores.reduce<Result>((acc, score) => ({
  total: acc.total + score,
  count: acc.count + 1
}), { total: 0, count: 0 })
const average = result.total / result.count

// BAD - Using let for conditional assignment
let message
if (isError) {
  message = 'Error occurred'
} else if (isLoading) {
  message = 'Loading...'
} else {
  message = 'Success!'
}

// GOOD - Define a function 
const message = function getMessage () {
  if (isError) {
    return 'Error occurred'
  }
  if (isLoading) {
    return 'Loading...'
  } 
  return 'Success'
}

// GOOD - Use ternary
const message = isError ? 'Error occurred' 
  : isLoading ? 'Loading...' 
  : 'Success!'
```

- Abstract `try`/`catch` blocks that need to define values into their own function that return the value:

```ts
// BAD - Combine `let` with `try`/`catch`
let userRecord
try {
  userRecord = await auth.createUser({
    email: input.email,
    password: input.password
  })
} catch (error) {
  throw new HttpsError('internal', 'Error creating user account')
}

// GOOD - Combine `const` with `function` to wrap `try`/`catch`
export default function createUser (email: string, password: string) {
  try {
    return await auth.createUser({ email, password })
  } catch (error) {
    throw new HttpsError('internal', 'Error creating user account')
  }
}

const userRecord = await createUser(input.email, input.password)
```

## 06. Self-Documenting Code

- Write clear, expressive, self-documenting code
- Never leave inline comments, JSDoc snippets, or unnecessary annotations.
- Here is an example of a BAD inline comment:

```ts
// Add the numbers together
const sum = 1 + 2
```

- Here is a GOOD example without the inline comment:

```ts
const sum = 1 + 2
```

- Prefer descriptive, explicit variable names over short, ambiguous ones to enhance code readability
- Prefer defining hardcoded values with named constants in ALL_CAPS to improve code clarity and maintainability
- Prefer breaking down multi-step logic into single step lines with their own constant variable.
- Prefer early returns to avoid nested conditions and improve readability
- Avoid abbreviations, but use short, simple, common words in names when possible.
- Name functions as verbs, like `getDocument`, `add`, or `combineData`.
- Name boolean variables as adjectives, like `heavy`, `imaged`.
- Do NOT name boolean variables with to be verbs, like `isHeavy` or `hasImages`.
- Prefix event handlers with "handle", like `handleClick` or `handleSubmit`.
- Use both camcelCase or PascalCase for file names and mix them together in the same folder.
- TypeScript type names get first priority when it comes to direct, intuitive names
  - Never include modifiers like `Type` or `I` or `Interface` in type names when they are not meaningful
  - If necessary other PascalCase names like classes or React components should get the "second choice" of a modified name
  - When it makes sense to include the feature or entity name in a type name, feel free
- Name functions as verbs or verbal phrases
- Name boolean variables as adjectives:

```ts
// BAD - verbal boolean
const isEmpty = count === 0

// GOOD - adjectival boolean
const empty = count === 0
```

## 07. Avoid Parentheticals

- Never nest logic in internal parenthetical statements:

```ts
// BAD - parenthetical logic
const variants = {
  ...oldVariants,
  ...(props.variants ?? { default: 1 }),
}

// GOOD - No parenthetical logic
const newVariants = props.variants ?? { default: 1 }
const variants = {
  ...oldVariants,
  ...newVariants
}
```

- Avoid wrapping logic in parentheses

```ts
// BAD - Wrapping parentheses
const variantValue = (variantBase + variantRandomOffset).toString(16)

// GOOD - No wrapping parentheses
const variantNumber = variantBase + variantRandomOffset
const variantValue = variantNumber.toString(16)
```

- Never return objects literals from arrow functions with parentheses, alwayse use an explicit return statement:

```ts
// BAD - Object returned in expression without function body
const docs = ids.map(id => ({ id, date: new Date() }))

// GOOD - Object returned in function with body and explicit return
const docs = ids.map(id => {
  return { id, date: new Date() }
})
```

## 08. Avoid Meaningless Aliases

- Avoid unnecessary aliases:

```ts
// BAD - Unnecessary alias
const operationCount = props.flow.operationCount
const operationSeed = `${seedString}-op-${operationCount}`

// GOOD - No aliasing
const operationSeed = `${seedString}-op-${props.flow.operationCount}`
```

- Avoid aliasing type conversions that are already protected by TypeScript:

```ts
// BAD - Unnecessary type conversion considering TypeScript
export default function createRand (props: {
  seed: string
}): Operation {
  const seedString = String(props.seed)
  return new Rand(seedString)
}

// GOOD - Avoid unnecessary conversion alias
export default function createRand (props: {
  seed: string
}): Operation {
  return new Rand(props.seed)
}
```

- Avoid creating alias variables for accessing object properties:

```ts
// Bad
const token = request.auth
if (token == null) {
  throw new Error('Unauthenticated')
}
console.info('valid request:', token)

// Good
if (request.auth == null) {
  throw new Error('Unauthenticated')
}
console.info('valid request', request.auth)
```

- Validate the relevant property to support type narrowing

```ts
// Bad
if (request.query?.component == null) {
  throw new Error('Missing query')
}
const component = request.query?.component // string | undefined
decodeURIComponent(component) // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

// Good
if (request.query == null) {
  throw new Error('Missing query')
}
decodeUriComponent(request.query.component) // string
```

- If necessary, revalidate data in multiple function scopes to avoid aliasing

```ts
// Bad
if (request.query == null) {
  throw new Error('Missing query')
}
const component = request.query.component
decodeUriComponent(component)
setTimeout (() => {
  decodeUriComponent(component)
}, 1000)

// Good
if (request.query == null) {
  throw new Error('Missing query')
}
decodeUriComponent(request.query.component)
setTimeout (() => {
  if (request.query == null) {
    throw new Error('Missing query')
  }
  decodeUriComponent(request.query.component)
}, 1000)
```

- Always follow these rules in Firebase Cloud Functions:

```ts
// BAD - Meaningless alias
if (request.auth?.uid === undefined) {
  throw new HttpsError('unauthenticated', 'There is no uid')
}
const uid = request.auth.uid
const db = getFirestore()
const userRef = db.collection('users').doc(uid)
await db.runTransaction(async (tx) => {
  firezodCreate({
    label: 'register user',
    ref: userRef,
    schema: userSchema,
    data: {
      id: userRecord.uid,
    },
    tx
  })
})

// GOOD - Avoid meaningless alias
if (request.auth === undefined) {
  throw new HttpsError('unauthenticated', 'There is no auth')
}
const db = getFirestore()
const userRef = db.collection('users').doc(request.auth.uid)
await db.runTransaction(async (tx) => {
  if (request.auth === undefined) {
    throw new HttpsError('unauthenticated', 'There is no auth')
  }
  firezodCreate({
    label: 'register user',
    ref: userRef,
    schema: userSchema,
    data: { id: request.auth.uid },
    tx
  })
})
```

- Give computed lookups their own constant

```ts
const firstIndex = i * 2
const secondIndex = firstIndex + 1

// BAD - Computed lookups without constants
const lastItem = shuffledItems[shuffledItems.length - 1]
return [props.items[firstIndex], props.items[secondIndex], lastItem]

// GOOD - Computed lookups with constants
const lastIndex = shuffledItems.length - 1
const lastItem = shuffledItems[lastItem]
const firstItem = props.items[firstIndex]
const secondItem = props.items[secondIndex]
return [firstItem, secondItem, lastItem]
```

- Write literal lookups inline:

```ts

// BAD - Literal lookups with constants
const firstItem = props.items[0]
const secondItem = props.items[1]
return [firstItem, secondItem]

// Good - Literal lookups without constants
return [props.items[0], props.items[1]]
```

## 09. Functions

- Always use the function keyword when creating a named function
- Always give functions an explicit return type
- Never define a named function that takes multiple arguments to keep relationships explicit
- If needed, always give functions a single parameter object named `props`:

```ts
// BAD - Multiple arguments
function add (a: number, b: number): number {
  return a + b
}
// GOOD - Single parameter object
function add (props: {
  a: number,
  b: number
}): number {
  return props.a + props.b
}
```

- Always define functions that take parameters with a single parameter object, even simple utility functions with one or two parameters.
- Functions that do not take parameters should not receive arguments:

```ts
// BAD - Unnecessary parameter argument:
function print (props: {}): void {
  console.info('hello world')
}

// GOOD - Functions that do not take parameters should not receive arguments:
function print (): void {
  console.info('hello world')
}
```
- Always define prop types inline, not with a named type:

```ts
// BAD - Named props type
interface AddProps {
  a: number,
  b: number
}
function add (props: AddProps): number {
  return props.a + props.b
}

// GOOD - Inline props type
function add (props: {
  a: number,
  b: number
}): number {
  return props.a + props.b
}
```

- Avoid destructuring `props`:

```ts
// BAD - Destructured props
function add (props: {
  a: number,
  b: number
}): number {
  const { a, b } = props
  return a + b
}
// GOOD - Avoid destructuring props
function add (props: {
  a: number,
  b: number
}): number {
  return props.a + props.b
}
```

- Always require prop types that are logically necessary:

```ts
// BAD - Optional necessary props
export default function createFlow (props?: { seed: Uid }): Flow {
  if (props?.seed == null) {
    throw new Error('Seed is required')
  }
  return { seed: props.seed }
}

// GOOD - Require necessary props
export default function createFlow (props: { seed: Uid }): Flow {
  if (props.seed == null) {
    throw new Error('Seed is required')
  }
  return { seed }
}
```

## 10. Prefer If Statements

- Prefer `if` statements:

```ts
// BAD - Could use `if`/`else` without changing logic
return single
  ? importSingleItem({ flow: baseFlow, item: props.items[0] })
  : importMultipleItems({ flow: baseFlow, items: props.items })

// GOOD - Uses `if`
if (single) {
  return importSingleItem({ flow: baseFlow, item: props.items[0] })
}
return importMultipleItems({ flow: baseFlow, items: props.items })
```

- Use `if` to keep conditional logic efficient:

```ts
// BAD - Inefficient conditional logic
function isOutputOperation (props: {
  operation: Operation
}): boolean {
  return props.operation.output.length > 0 &&
          props.operation.aInput.length === 0 &&
          props.operation.bInput.length === 0
}

// GOOD - Efficient use of `if`
function isOutputOperation (props: {
  operation: Operation
}): boolean {
  const empty = props.operation.output.length <= 0
  if (empty) {
    return false
  }
  const aFull = props.operation.aInput.length !== 0
  if (aFull) {
    return false
  }
  const bFull = props.operation.bInput.length !== 0
  if (bFull) {
    return false 
  }
  return true
}
```

- Never use `switch`/`case` blocks, use `if` instead to keep code flexible:

```ts
// BAD - `switch`/`case`
switch (input.type) {
  case 'boolean': {
    return { type: 'boolean' }
  }
  case 'text': {
    return { type: 'text'}
  }
  default: {
    throw new Error('Invalid type')
  }
}

// GOOD - `if`
if (type === 'boolean') {
  return { type: 'boolean' }
}
if (type === 'text') {
  return { type: 'text' }
}
throw new Error('Invalid type')
```

## 11. Camel Casing Preferred

- Files that do not contain React Components should be in camelCase
- It is encouraged for some file names to use camelCase and some file names to use PascalCase inside the same feature
- It is safe for files with different casing to import from each other
- It is encouraged for one directory to contain mostly files one case and only one or a few files of another case
- Only React Component files and class files should use PascalCase
- Files that do not contain React Components or classes should be in camelCase

## 12. Alphabetic Order

- Always define object property names in alphabetic order.

```ts
// Good
const tagSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string()
})
const user = {
  age: 25,
  id: "123",
  name: "John"
}
```

- Prefer defining lists of values in alphabetic order if it doesn't matter what order the values are in.

```ts
// Good
export const statusSchema = z.enum([
  'Complete',
  'Failed',
  'Pending',
])
const COLORS = [
  'Blue',
  'Green',
  'Red'
]
```

- Prefer calling methods or passing arguments to methods in alphabetic order if it doesn't matter what order they are called in.

```ts
// Good
const colorList = colorController
  .blue()
  .green()
  .red()
const subtypesSchema = booleanSubtypeShcema
  .or(numberSubtypeSchema)
  .or(textSubtypeSchema)
```

- Prefer defining variables in alphabetic order, but not if it would make the block less intuitive or readable.

```ts
// Good
const blue = '0000FF'
const green = '00FF00'
const red = 'FF0000'
const message = `The codes are ${red}, ${green}, ${blue}`
```

- Always prefer alphabetizing, including:

- Imports
- React Props
- Destructured property values

## 13. Remove Dead Code

- Always remove dead code including:
  - Empty directories
    - Delete the directory
  - Unused files
    - Delete the file.
    - Delete the directory if it is empty now
  - Unused exports
    - Stop exporting the variable.
    - If the variable is used in its own file
    - If the variable is not used in its own file, delete it
  - Unused dependencies:
    - Remove the dependency.
    - Delete or uninstall the dependency if is no longer used
  - Unused types:
    - Stop exporting the type if it is exported
    - Delete the variable it is no longer used
- Never keep dead code
- Do not keep dead code if it is:
  - A schema only used to infer a dead type (so you have to check)
  - Used only for documentation
  - Used only for future extensibility
  - Used only in development/debugging
- Use the `npm run deadcode` command to find dead code
  - `npm run deadcode` runs the command `npx knip --reporter ./my-reporter.js`
  - Trust results from `knip`
  - Never ignore results from `npm run deadcode`
  - If you see a result, you should remove it
  - If you are confident removing a result is a bad idea, stop and ask for help
  - Do not edit `my-reporter.js`, leave that to the human developer

## 14. Throw Errors

- Do not catch all errors
- In many cases throwing an error is the right behavior
- The original error message is generally the most useful
- Catch errors at the lowest possible level

## 15. TypeScript Standard Lint

- Never use any other linters or formatting tools outside of `ts-standard`
- Always ignore the warning from `ts-standard` about the TypeScript version, our TypeScript version should be safe for this command.
- Use the `npm run lint` command to fix and find linting issues.
  - `npm run lint` runs the command `npx ts-standard --fix`.
  - To minimize tool calls, always fixing linting issues automatically with `npm run lint` if the issue is autofixable.
- Avoid trailing spaces or improperly ending files with StandardJS syntax
- It is especially important to automtically fix linting isues with `npm run lint` if you get a linting result with only these errors, because the file editor tooling struggles to save these fixes correctly:

```
Trailing spaces not allowed. (no-trailing-spaces)
Newline required at the end of file but not found (eol-last)
```

## 16. Jest Testing

- Ensure the code you write passes all tests
- If you think everything is working, test with `npm run test`
- `npm run test` runs the command `npx jest --json > jest-results.json && node parse-jest-failures.js`
- If tests fail, fix the code to follow the tests.
- Never edit the code in the `/tests` directory or add new tests, leave that to the human developer
- If you think the tests are written incorrectly, stop and ask for help

## 17. NPM Run Check

- `npm run check` executes `tsc`, `jest`, `knip`, `ts-standard`: 

```sh
npx tsc && npm run test && npm run deadcode && npm run lint
```

- Always `npm run check` if you are uncertain if there are remaining issues
- Always `npm run check` if you need to confirm you're done with a task
- Always follow this process when you run `npm run check`:
  1. Make sure you are in the project's root directory
  2. Run `npm run check` to identify issues
  5. Fix the issues, even if you need remove the code
  6. `npm run check` again to ensure there are no new issues

- Never tell me about output if you see output that I won't find interesting or important
- Never ask for permission or confirmation to run the command

## 18. Single Function Files

- Prefer single function files
- Always keep the function and filename the same.
- Always export the function by default in the same line as the function declaration:

```
// add.ts
export default function add (a: number, b: number) {
  const sum = a + b
  return sum
}
```

## 19. Zod Validation

- Whenever possible base needed TypeScript types on Zod schemas using `z.infer`
- Do not infer unnecessary types, they are dead code
- Always `.parse` data when it is delivered over a network or read from a file system because the type cannot be inferred.
- Never `.parse` data if its type can be safely inferred.
- Always validate with `.parse`, not `.safeParse`, catching errors only if appropriate
- Do not create inferred types from ZodSchemas unless the type is currently needed somewhere
- Keep schema names in camelCase
- Denote schema variables by ending their name with `Schema`
- Do not use `.strict` with Zod schemas
- Do not manually annotate schemas with `ZodType` or anything else
- Coerce date strings into date objects when appropriate using `z.coerce.date`

## 20. Zod for TypeScript Only

- Only use Zod schemas for types that TypeScript recognizes.
- NEVER use `.min`, `.max`, `.email`, `.transform`, `.refine`, `.default`.
- The purpose of using Zod is to make TypeScript safe.
- If you need to validate a non-TypeScript aspect of a value somewhere outside of Zod types files, don't modify any Zod schemas.
- Instead:
  - Use custom conditional logic 
  - Use an if statment to check if the value is incorrect in that aspect
  - If it is, throw an error
  - Otherwise, continue with confidence that the aspect is safe.
  - For example:

    ```
    // Incorrect
    const passwordSchema = z.string().min(8)
    function handleSubmit (password: string) {
      const safe = passwordSchema.parse(password)
      submit(safe)
    }

    // Correct
    const passwordSchema = z.string()
    function handleSubmit (password: string() {
      const parsed = passworSchema.parse(password)
      if (parsed.length < 8) {
        throw new Error('The password must be at least 8 characters')
      }
      submit(safe)
    }
    ```

## 21. Zod Versions and Schemas

Do not use zod unions to handle multi-version schemas, use `.or()` and `.and()` instead

- Never use `z.union()` or `z.discriminatedUnion()` - use `.or()` instead
- Never use `z.extend()` - use `.and()` instead
- Never spread schema shapes - define separate objects and combine with `.and()`
- It is encouraged to use intermediate types to facilitate this pattern.
- For discriminated types:

    ```typescript
    // ❌ Don't do this:
    const baseSchema = z.object({ id: z.string() })
    const versionsSchema = z.discriminatedUnion('type', [
        z.object({ type: z.literal('a'), data: z.string() }),
        z.object({ type: z.literal('b'), data: z.number() })
    ])
    export const schema = baseSchema.and(versionsSchema)
    export type Schema = z.infer<typeof schema>
    // { id: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    // ✅ Do this instead:
    const baseSchema = z.object({ id: z.string })
    const aVersionSchema = z.object({ type: z.literal('a'), data: z.string() })
    const bVersionSchema = z.object({ type: z.literal('b'), data: z.number() })
    const versionsSchema = aVersionSchema.or(bVersionSchema)
    export const schema = baseSchema.and(versionsSchema)
    export type Schema = z.infer<typeof schema>
    // { id: string } & ({ type: 'a', data: string } | { type: 'b', data: number })
    ```

    - If the schema has sublevels with versions, use this same pattern for the subtypes there.
    - Avoid recursive schemas if they do not fit this pattern.
    - This keeps the schemas flexible, compatible with other tools, and transparently simple.

- If multiple schemas share bases and versions, consider reusing the subtypes:

    ```typescript
    // ❌ Don't duplicate version or base schema fields:
    const baseSchema = z.object({ id: z.string() })
    const aVersionSchema = z.object({ type: z.literal('a'), data: z.string() })
    const bVersionSchema = z.object({ type: z.literal('b'), data: z.number() })
    const versionsSchema = aVersionSchema.or(bVersionSchema)
    export const schema = baseSchema.and(versionsSchema)
    export type Schema = z.infer<typeof schema>
    // { id: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    const labelBaseSchema = z.object({ id: z.string(), label: z.string() })
    const labelAVersionSchema = z.object({ type: z.literal('a'), data: z.string() })
    const labelBVersionSchema = z.object({ type: z.literal('b'), data: z.number() })
    const labelVersionsSchema = labelAVersionSchema.or(labelBVersionSchema)
    export const labelSchema = labelBaseScema.and(labelVersionsSchema)
    export type LabelSchema = z.infer<typeof labelSchema>
    // { id: string, label: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    export const labelDocBaseSchema = z.object({ label: z.string () })
    export const labelDocSchema = labelDocBaseSchema.and(labelVersionsSchema)
    export type LabelDoc = z.infer<typeof labelDocSchema>
    // { label: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    // ✅ Reuse shared schemas whenever possible:
    const baseSchema = z.object({ id: z.string() })
    const aVersionSchema = z.object({ type: z.literal('a'), data: z.string() })
    const bVersionSchema = z.object({ type: z.literal('b'), data: z.number() })
    const versionsSchema = aVersionSchema.or(bVersionSchema)
    export const schema = baseSchema.and(versionsSchema)
    export type Schema = z.infer<typeof schema>
    // { id: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    const labelSpecificSchema = z.object({ label: z.string() })
    const labelBaseSchema = baseSchema.and(labelSpecificSchema)
    export const labelSchema = labelBaseSchema.and(versionsSchema)
    export type LabelSchema = z.infer<typeof labelSchema>
    // { id: string, label: string } & ({ type: 'a', data: string } | { type: 'b', data: number })

    export const labelDocSchema = labelSpecificSchema.and(versionsSchema)
    // { label: string } & ({ type: 'a', data: string } | { type: 'b', data: number })
    ```

    - We always want to reuse schemas instead of recreating them when logically simpler.

## 22. Zod Type Files

- Always keep schemas and inferred types next to eachother in the same files dedicated to types.
- Always denote them as type files by ending them with `Types.ts` or `Types.tsx`
- Always give these files camelCase names like `authTypes.ts`
- Outside of these `Types.ts` files, NEVER:
  - Modify schemas using `.omit`, `.and`, `.or`, `.extend`, `.merge`, or any other tool.
  - Infer new types from schemas with `z.infer` or any other tool.
- Only use schemas outside of `Types.ts` files to validated values with `.parse`.
- Never infer a schema type inline in the definition of another type or schema, define a named type below the schema instead:

```ts
// BAD - Schema type inferred inline
const baseCategorySchema = z.object({ name: z.string() })

type Category = z.infer<typeof baseCategorySchema> & {
  subcategories: Category[];
}

// GOOD - Schema type declared separately with a name
const baseCategorySchema = z.object({ name: z.string()})
type BaseCategory = z.infer<typeof baseCategorySchema>

type Category = BaseCategory & { subcategories: Category[] }
```

- If a type is inferred from a schema, always infer the type directly below the schema:

```ts
// BAD - Types separated from schemas
const userSchema = z.object({ name: z.string() })
const postSchema = z.sobject({ title: z.string() })

type User = z.infer<typeof userSchema>
type Post = z.infer<typeof postSchema>

// GOOD - Types grouped with schemas

const userSchema = z.object({ name: z.string() })
type User = z.infer<typeof userSchema>

const postSchema = z.sobject({ title: z.string() })
type Post = z.infer<typeof postSchema>
```

- If a type is used to annotate a schema, always declare that type above the schema:

```ts
// BAD - Annotation type declared after it is used in an annotation
const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()),
});
type Category = BaseCategory & { subcategories: Category[] }

// GOOD - Annotation type declared before it is used in an annotation
type Category = BaseCategory & { subcategories: Category[] }
const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()),
});
```

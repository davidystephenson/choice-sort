import { z } from 'zod'

export const itemSchema = z.object({
  label: z.string(),
  seed: z.number().optional(),
  uid: z.string()
})
export type Item = z.infer<typeof itemSchema>

export const choiceSchema = z.object({
  catalog: z.string(),
  operation: z.string(),
  queue: z.string()
})
export type Choice = z.infer<typeof choiceSchema>

export const operationSchema = z.object({
  better: z.number().optional(),
  catalog: z.array(z.string()),
  output: z.array(z.string()),
  queue: z.array(z.string()),
  uid: z.string()
})
export type Operation = z.infer<typeof operationSchema>

export const operationDefSchema = z.object({
  catalog: z.array(z.string()),
  queue: z.array(z.string()),
  output: z.array(z.string())
})
export type OperationDef = z.infer<typeof operationDefSchema>

export const flowSchema = z.object({
  count: z.number(),
  items: z.record(z.string(), itemSchema),
  operations: z.record(z.string(), operationSchema),
  uid: z.string()
})
export type Flow = z.infer<typeof flowSchema>

const rankingItemSpecificSchema = z.object({
  points: z.number(),
  rank: z.number()
})
export const rankingItemSchema = itemSchema.and(rankingItemSpecificSchema)
export type RankingItem = z.infer<typeof rankingItemSchema>

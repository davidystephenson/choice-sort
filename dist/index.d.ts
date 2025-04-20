import { z } from 'zod';

declare const itemSchema: z.ZodObject<{
    label: z.ZodString;
    seed: z.ZodOptional<z.ZodNumber>;
    uid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label: string;
    uid: string;
    seed?: number | undefined;
}, {
    label: string;
    uid: string;
    seed?: number | undefined;
}>;
type Item = z.infer<typeof itemSchema>;
declare const choiceSchema: z.ZodObject<{
    catalog: z.ZodString;
    operation: z.ZodString;
    queue: z.ZodString;
}, "strip", z.ZodTypeAny, {
    catalog: string;
    operation: string;
    queue: string;
}, {
    catalog: string;
    operation: string;
    queue: string;
}>;
type Choice = z.infer<typeof choiceSchema>;
declare const operationSchema: z.ZodObject<{
    better: z.ZodOptional<z.ZodNumber>;
    catalog: z.ZodArray<z.ZodString, "many">;
    output: z.ZodArray<z.ZodString, "many">;
    queue: z.ZodArray<z.ZodString, "many">;
    uid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uid: string;
    catalog: string[];
    queue: string[];
    output: string[];
    better?: number | undefined;
}, {
    uid: string;
    catalog: string[];
    queue: string[];
    output: string[];
    better?: number | undefined;
}>;
type Operation = z.infer<typeof operationSchema>;
declare const operationDefSchema: z.ZodObject<{
    catalog: z.ZodArray<z.ZodString, "many">;
    queue: z.ZodArray<z.ZodString, "many">;
    output: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    catalog: string[];
    queue: string[];
    output: string[];
}, {
    catalog: string[];
    queue: string[];
    output: string[];
}>;
type OperationDef = z.infer<typeof operationDefSchema>;
declare const flowSchema: z.ZodObject<{
    count: z.ZodNumber;
    items: z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodString;
        seed: z.ZodOptional<z.ZodNumber>;
        uid: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        uid: string;
        seed?: number | undefined;
    }, {
        label: string;
        uid: string;
        seed?: number | undefined;
    }>>;
    operations: z.ZodRecord<z.ZodString, z.ZodObject<{
        better: z.ZodOptional<z.ZodNumber>;
        catalog: z.ZodArray<z.ZodString, "many">;
        output: z.ZodArray<z.ZodString, "many">;
        queue: z.ZodArray<z.ZodString, "many">;
        uid: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uid: string;
        catalog: string[];
        queue: string[];
        output: string[];
        better?: number | undefined;
    }, {
        uid: string;
        catalog: string[];
        queue: string[];
        output: string[];
        better?: number | undefined;
    }>>;
    uid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uid: string;
    count: number;
    items: Record<string, {
        label: string;
        uid: string;
        seed?: number | undefined;
    }>;
    operations: Record<string, {
        uid: string;
        catalog: string[];
        queue: string[];
        output: string[];
        better?: number | undefined;
    }>;
}, {
    uid: string;
    count: number;
    items: Record<string, {
        label: string;
        uid: string;
        seed?: number | undefined;
    }>;
    operations: Record<string, {
        uid: string;
        catalog: string[];
        queue: string[];
        output: string[];
        better?: number | undefined;
    }>;
}>;
type Flow = z.infer<typeof flowSchema>;
declare const rankingItemSchema: z.ZodIntersection<z.ZodObject<{
    label: z.ZodString;
    seed: z.ZodOptional<z.ZodNumber>;
    uid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label: string;
    uid: string;
    seed?: number | undefined;
}, {
    label: string;
    uid: string;
    seed?: number | undefined;
}>, z.ZodObject<{
    points: z.ZodNumber;
    rank: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    points: number;
    rank: number;
}, {
    points: number;
    rank: number;
}>>;
type RankingItem = z.infer<typeof rankingItemSchema>;

declare function chooseOption(props: {
    flow: Flow;
    option: string;
}): Flow;

declare function createFlow(props: {
    uid: string;
}): Flow;

declare function createUid(props: {
    uid: string;
    count: number;
}): string;

declare function getChoice(props: {
    flow: Flow;
}): Choice | undefined;

declare function getRanking(props: {
    flow: Flow;
}): RankingItem[];

declare function importItems(props: {
    flow: Flow;
    items: Item[];
}): Flow;

declare function isFlowComplete(props: {
    flow: Flow;
}): boolean;

export { type Choice, type Flow, type Item, type Operation, type OperationDef, type RankingItem, choiceSchema, chooseOption, createFlow, createUid, flowSchema, getChoice, getRanking, importItems, isFlowComplete, itemSchema, operationDefSchema, operationSchema, rankingItemSchema };

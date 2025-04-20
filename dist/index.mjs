var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/isOutputOperation.ts
function isOutputOperation(props) {
  const outputEmpty = props.operation.output.length <= 0;
  if (outputEmpty) {
    return false;
  }
  const hasAInputs = props.operation.queue.length !== 0;
  if (hasAInputs) {
    return false;
  }
  const hasBInputs = props.operation.catalog.length !== 0;
  if (hasBInputs) {
    return false;
  }
  return true;
}

// src/isFlowComplete.ts
function isFlowComplete(props) {
  const operations = Object.values(props.flow.operations);
  if (operations.length === 0) {
    return Object.keys(props.flow.items).length === 0;
  }
  for (const operation of operations) {
    if (operation.queue.length > 0 && operation.catalog.length === 0 || operation.queue.length === 0 && operation.catalog.length > 0) {
      throw new Error("Operation has only one of the inputs");
    }
  }
  for (const operation of operations) {
    if (operation.queue.length === 0 && operation.catalog.length === 0 && operation.output.length === 0) {
      throw new Error("Operation has no inputs or outputs");
    }
  }
  const outputOperations = operations.filter((operation) => isOutputOperation({ operation }));
  if (outputOperations.length > 1) {
    throw new Error("Flow has multiple output operations");
  }
  if (operations.length > 1) {
    return false;
  }
  if (operations.length === 1 && outputOperations.length === 1) {
    return true;
  }
  return false;
}

// src/getFloorHalf.ts
function getFloorHalf(props) {
  if (typeof props.value !== "number") {
    throw new Error("Value must be a number");
  }
  const half = props.value / 2;
  const floored = Math.floor(half);
  return floored;
}

// src/getInitialOptionIndex.ts
function getInitialOptionIndex(props) {
  const difference = props.operation.catalog.length - 1;
  const half = getFloorHalf({ value: difference });
  return half;
}

// src/getOptionIndex.ts
function getOptionIndex(props) {
  if (props.operation.better != null) {
    if (typeof props.operation.better !== "number") {
      throw new Error("Better must be a number");
    }
    if (props.operation.better < 1) {
      throw new Error("Better must be positive");
    }
    const initial = getInitialOptionIndex({ operation: props.operation });
    if (props.operation.better > initial) {
      throw new Error("Better must be less than or equal to the initial option index");
    }
    return getFloorHalf({ value: props.operation.better });
  }
  return getInitialOptionIndex({ operation: props.operation });
}

// src/getChoiceOperation.ts
function getChoiceOperation(props) {
  const operations = Object.values(props.flow.operations);
  if (operations.length === 0) {
    throw new Error("Flow has no operations");
  }
  if (isFlowComplete({ flow: props.flow })) {
    throw new Error("Flow is complete");
  }
  const zeroIndexNonOutputOps = operations.filter(
    (op) => !isOutputOperation({ operation: op }) && getOptionIndex({ operation: op }) === 0
  );
  if (zeroIndexNonOutputOps.length > 0) {
    return zeroIndexNonOutputOps.reduce(
      (earliest, current) => current.uid < earliest.uid ? current : earliest
    );
  }
  const nonOutputOps = operations.filter((op) => !isOutputOperation({ operation: op }));
  const choiceOperation = nonOutputOps.reduce((bestOperation, currentOperation) => {
    const currentIndex = getOptionIndex({ operation: currentOperation });
    const bestIndex = bestOperation != null ? getOptionIndex({ operation: bestOperation }) : -1;
    if (currentIndex > bestIndex) {
      return currentOperation;
    }
    if (currentIndex === bestIndex && bestOperation != null && currentOperation.uid < bestOperation.uid) {
      return currentOperation;
    }
    return bestOperation;
  }, null);
  if (choiceOperation == null) {
    throw new Error("No operation found");
  }
  return choiceOperation;
}

// src/getChoice.ts
function getChoice(props) {
  if (isFlowComplete({ flow: props.flow })) {
    return void 0;
  }
  try {
    const selectedOperation = getChoiceOperation({ flow: props.flow });
    if (selectedOperation.queue.length === 0 || selectedOperation.catalog.length === 0) {
      return void 0;
    }
    const aItem = selectedOperation.queue[0];
    const optionIndex = getOptionIndex({ operation: selectedOperation });
    const bItem = selectedOperation.catalog[optionIndex];
    return {
      queue: aItem,
      catalog: bItem,
      operation: selectedOperation.uid
    };
  } catch (e) {
    return void 0;
  }
}

// src/operate.ts
function operate(props) {
  const choice = getChoice({ flow: props.flow });
  if (choice == null) {
    throw new Error("Flow has no choice");
  }
  const operation = props.flow.operations[choice.operation];
  const optionIndex = getOptionIndex({ operation });
  if (props.option !== choice.queue && props.option !== choice.catalog) {
    throw new Error("Option is not in the choice");
  }
  if (operation.better != null) {
    if (typeof operation.better !== "number") {
      throw new Error("Better must be a number");
    }
    if (operation.better < 1) {
      throw new Error("Better must be positive");
    }
    const initial = getInitialOptionIndex({ operation });
    if (operation.better > initial) {
      throw new Error("Better cannot be greater than the initial option index");
    }
  }
  if (operation.queue.length > operation.catalog.length) {
    throw new Error("Queue cannot be longer than catalog");
  }
  if (operation.catalog.length <= 2 && operation.better != null) {
    throw new Error("Cannot have better defined when catalog is two or less long");
  }
  const newOperation = __spreadValues({}, operation);
  const newOperations = __spreadValues({}, props.flow.operations);
  if (props.option === choice.catalog) {
    if (optionIndex === 0) {
      newOperation.better = void 0;
      if (operation.queue.length === 1) {
        newOperation.output = [
          ...operation.output,
          operation.queue[0],
          ...operation.catalog
        ];
        newOperation.queue = [];
        newOperation.catalog = [];
      } else {
        newOperation.output = [
          ...operation.output,
          operation.queue[0]
        ];
        newOperation.queue = operation.queue.slice(1);
      }
    } else {
      if (operation.better == null) {
        newOperation.better = optionIndex;
      } else {
        newOperation.better = getFloorHalf({ value: operation.better });
      }
    }
  } else {
    if (operation.catalog.length === 1) {
      newOperation.output = [
        ...operation.output,
        operation.catalog[0],
        operation.queue[0]
      ];
      newOperation.catalog = [];
      newOperation.queue = operation.queue.slice(1);
      newOperation.better = void 0;
    } else {
      const catalogToOutput = operation.catalog.slice(0, optionIndex + 1);
      newOperation.output = [
        ...operation.output,
        ...catalogToOutput
      ];
      newOperation.catalog = operation.catalog.slice(optionIndex + 1);
      if (operation.better != null) {
        const difference = operation.better - optionIndex;
        if (difference === 1) {
          newOperation.output = [
            ...newOperation.output,
            operation.queue[0]
          ];
          newOperation.queue = operation.queue.slice(1);
          newOperation.better = void 0;
          if (newOperation.queue.length === 0) {
            newOperation.output = [
              ...newOperation.output,
              ...newOperation.catalog
            ];
            newOperation.catalog = [];
          }
        } else {
          newOperation.better = getFloorHalf({ value: operation.better - 1 });
        }
      } else {
        newOperation.better = void 0;
      }
      if (newOperation.queue.length >= newOperation.catalog.length) {
        const temp = newOperation.queue;
        newOperation.queue = newOperation.catalog;
        newOperation.catalog = temp;
      }
    }
  }
  newOperations[choice.operation] = newOperation;
  return __spreadProps(__spreadValues({}, props.flow), {
    operations: newOperations
  });
}

// src/createUid.ts
import Rand from "rand-seed";
function createUid(props) {
  const seedString = `${props.uid}-${props.count}`;
  const rand = new Rand(seedString);
  const hexDigits = Array.from({ length: 32 }, () => {
    const randomValue = Math.floor(rand.next() * 16);
    return randomValue.toString(16);
  });
  const uuidSection1 = hexDigits.slice(0, 8).join("");
  const uuidSection2 = hexDigits.slice(8, 12).join("");
  const versionSection = `4${hexDigits.slice(13, 16).join("")}`;
  const variantBase = 8;
  const variantRandomOffset = Math.floor(rand.next() * 4);
  const variantNumber = variantBase + variantRandomOffset;
  const variantValue = variantNumber.toString(16);
  const variantSection = `${variantValue}${hexDigits.slice(17, 20).join("")}`;
  const uuidSection5 = hexDigits.slice(20, 32).join("");
  return `${uuidSection1}-${uuidSection2}-${versionSection}-${variantSection}-${uuidSection5}`;
}

// src/createOperation.ts
function createOperation(props) {
  if (props.queue == null || props.catalog == null || props.output == null) {
    throw new Error("Operation definition is required");
  }
  const inputsEmpty = props.queue.length === 0 && props.catalog.length === 0;
  const outputEmpty = props.output.length === 0;
  const empty = inputsEmpty && outputEmpty;
  if (empty) {
    throw new Error("Operation cannot be empty");
  }
  const aPresent = props.queue.length > 0;
  const bPresent = props.catalog.length > 0;
  const oneSided = aPresent !== bPresent;
  if (oneSided) {
    throw new Error("Cannot have input on only one side");
  }
  if (props.queue.length > props.catalog.length) {
    throw new Error("queue cannot be longer than catalog");
  }
  const allUids = [...props.queue, ...props.catalog, ...props.output];
  const uniqueUids = new Set(allUids);
  const duplicate = allUids.length !== uniqueUids.size;
  if (duplicate) {
    throw new Error("Duplicate UIDs in operation");
  }
  const uid = createUid({
    uid: props.flow.uid,
    count: props.flow.count
  });
  const operation = {
    better: void 0,
    catalog: props.catalog,
    queue: props.queue,
    output: props.output,
    uid
  };
  return operation;
}

// src/addOperation.ts
function addOperation(props) {
  if (props.flow == null) {
    throw new Error("Flow is required");
  }
  if (props.operation == null) {
    throw new Error("Operation is required");
  }
  if (props.flow.operations[props.operation.uid] != null) {
    throw new Error("Operation UID is not unique");
  }
  const operations = __spreadProps(__spreadValues({}, props.flow.operations), {
    [props.operation.uid]: props.operation
  });
  const operationCount = props.flow.count + 1;
  return __spreadProps(__spreadValues({}, props.flow), {
    operations,
    count: operationCount
  });
}

// src/combineOperations.ts
function combineOperations(props) {
  const operations = Object.values(props.flow.operations);
  const outputOperations = operations.filter((operation) => isOutputOperation({ operation }));
  if (outputOperations.length > 2) {
    throw new Error("Flow has more than two output operations");
  }
  if (outputOperations.length !== 2) {
    return props.flow;
  }
  const [first, second] = outputOperations;
  const firstLength = first.output.length;
  const secondLength = second.output.length;
  let catalogOperation;
  let queueOperation;
  if (firstLength === secondLength) {
    if (first.uid < second.uid) {
      catalogOperation = first;
      queueOperation = second;
    } else {
      catalogOperation = second;
      queueOperation = first;
    }
  } else {
    if (firstLength > secondLength) {
      catalogOperation = first;
      queueOperation = second;
    } else {
      catalogOperation = second;
      queueOperation = first;
    }
  }
  const newOperation = createOperation({
    flow: props.flow,
    catalog: catalogOperation.output,
    queue: queueOperation.output,
    output: []
  });
  const operationsToKeep = Object.entries(props.flow.operations).filter(([uid]) => uid !== first.uid && uid !== second.uid).reduce((acc, [uid, operation]) => {
    acc[uid] = operation;
    return acc;
  }, {});
  const flowWithoutOutputOperations = __spreadProps(__spreadValues({}, props.flow), {
    operations: operationsToKeep
  });
  return addOperation({
    flow: flowWithoutOutputOperations,
    operation: newOperation
  });
}

// src/chooseOption.ts
function chooseOption(props) {
  const chosenFlow = operate({ flow: props.flow, option: props.option });
  const combinedFlow = combineOperations({ flow: chosenFlow });
  return combinedFlow;
}

// src/createFlow.ts
function createFlow(props) {
  if (props.uid == null) {
    throw new Error("UID is required");
  }
  return {
    count: 0,
    items: {},
    operations: {},
    uid: props.uid
  };
}

// src/getRanking.ts
function getRanking(props) {
  const empty = Object.keys(props.flow.operations).length === 0;
  if (empty) {
    return [];
  }
  const operations = Object.values(props.flow.operations);
  const operationItemUids = operations.flatMap((operation) => {
    return [...operation.queue, ...operation.catalog, ...operation.output];
  });
  const uniqueOperationItemUids = /* @__PURE__ */ new Set();
  const duplicateUids = [];
  operationItemUids.forEach((uid) => {
    const duplicate = uniqueOperationItemUids.has(uid);
    if (duplicate) {
      duplicateUids.push(uid);
    } else {
      uniqueOperationItemUids.add(uid);
    }
  });
  const hasDuplicates = duplicateUids.length > 0;
  if (hasDuplicates) {
    const joined = duplicateUids.join(", ");
    throw new Error(`Duplicate item UIDs: ${joined}`);
  }
  const items = Object.values(props.flow.items);
  const missingOperationItemUids = Array.from(uniqueOperationItemUids).filter((uid) => {
    return !items.some((item) => item.uid === uid);
  });
  const hasMissingOperationItems = missingOperationItemUids.length > 0;
  if (hasMissingOperationItems) {
    const joined = missingOperationItemUids.join(", ");
    throw new Error(`Missing items: ${joined}`);
  }
  const missingItems = items.filter((item) => {
    return !operationItemUids.includes(item.uid);
  });
  const hasMissingItems = missingItems.length > 0;
  if (hasMissingItems) {
    const uids = missingItems.map((item) => item.uid);
    const joined = uids.join(", ");
    throw new Error(`Missing items: ${joined}`);
  }
  const rankingItemsMap = /* @__PURE__ */ new Map();
  operations.forEach((operation) => {
    const outputLength = operation.output.length;
    operation.output.forEach((outputUid, index) => {
      const item = props.flow.items[outputUid];
      rankingItemsMap.set(outputUid, __spreadProps(__spreadValues({}, item), {
        points: index,
        rank: 1
      }));
    });
    operation.queue.forEach((aInputUid, index) => {
      const item = props.flow.items[aInputUid];
      const points = index + outputLength;
      rankingItemsMap.set(aInputUid, __spreadProps(__spreadValues({}, item), {
        points,
        rank: 1
      }));
    });
    operation.catalog.forEach((bInputUid, index) => {
      const item = props.flow.items[bInputUid];
      const better = operation.better != null && operation.better <= index;
      const betterOffset = better ? 1 : 0;
      const points = index + outputLength + betterOffset;
      rankingItemsMap.set(bInputUid, __spreadProps(__spreadValues({}, item), {
        points,
        rank: 1
      }));
    });
  });
  const rankingItems = Array.from(rankingItemsMap.values());
  const pointValues = rankingItems.map((item) => item.points);
  const uniquePointValues = [...new Set(pointValues)];
  const descendingPointValues = uniquePointValues.sort((a, b) => b - a);
  rankingItems.forEach((item) => {
    const greaterPoints = descendingPointValues.filter((points) => points > item.points);
    item.rank = greaterPoints.length + 1;
  });
  rankingItems.sort((a, b) => {
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }
    return a.label.localeCompare(b.label);
  });
  return rankingItems;
}

// src/importItems.ts
function importItems(props) {
  if (props.items.length === 0) {
    throw new Error("Items cannot be empty");
  }
  const uids = props.items.map((item) => item.uid);
  const uniqueUids = new Set(uids);
  if (uniqueUids.size !== props.items.length) {
    throw new Error("Item UIDs must be unique");
  }
  for (const item of props.items) {
    if (props.flow.items[item.uid] != null) {
      throw new Error("Item UIDs must be unique across the entire flow");
    }
  }
  const itemsRecord = __spreadValues({}, props.flow.items);
  for (const item of props.items) {
    itemsRecord[item.uid] = item;
  }
  const baseFlow = __spreadProps(__spreadValues({}, props.flow), {
    items: itemsRecord
  });
  if (props.items.length === 1) {
    const operation2 = createOperation({
      queue: [],
      catalog: [],
      flow: baseFlow,
      output: [props.items[0].uid]
    });
    return addOperation({
      flow: baseFlow,
      operation: operation2
    });
  }
  const items = Object.values(baseFlow.items);
  const pairCount = Math.floor(items.length / 2);
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const firstIndex = i * 2;
    const secondIndex = i * 2 + 1;
    const firstItem = items[firstIndex];
    const secondItem = items[secondIndex];
    return [firstItem, secondItem];
  });
  const flowWithPairs = pairs.reduce((currentFlow, pair) => {
    const operation2 = createOperation({
      queue: [pair[0].uid],
      catalog: [pair[1].uid],
      flow: currentFlow,
      output: []
    });
    return addOperation({
      flow: currentFlow,
      operation: operation2
    });
  }, baseFlow);
  const hasRemainingItem = items.length % 2 === 1;
  if (!hasRemainingItem) {
    return flowWithPairs;
  }
  const lastIndex = items.length - 1;
  const remainingItem = items[lastIndex];
  const operation = createOperation({
    queue: [],
    catalog: [],
    flow: flowWithPairs,
    output: [remainingItem.uid]
  });
  return addOperation({
    flow: flowWithPairs,
    operation
  });
}

// src/flowTypes.ts
import { z } from "zod";
var itemSchema = z.object({
  label: z.string(),
  seed: z.number().optional(),
  uid: z.string()
});
var choiceSchema = z.object({
  catalog: z.string(),
  operation: z.string(),
  queue: z.string()
});
var operationSchema = z.object({
  better: z.number().optional(),
  catalog: z.array(z.string()),
  output: z.array(z.string()),
  queue: z.array(z.string()),
  uid: z.string()
});
var operationDefSchema = z.object({
  catalog: z.array(z.string()),
  queue: z.array(z.string()),
  output: z.array(z.string())
});
var flowSchema = z.object({
  count: z.number(),
  items: z.record(z.string(), itemSchema),
  operations: z.record(z.string(), operationSchema),
  uid: z.string()
});
var rankingItemSpecificSchema = z.object({
  points: z.number(),
  rank: z.number()
});
var rankingItemSchema = itemSchema.and(rankingItemSpecificSchema);
export {
  choiceSchema,
  chooseOption,
  createFlow,
  createUid,
  flowSchema,
  getChoice,
  getRanking,
  importItems,
  isFlowComplete,
  itemSchema,
  operationDefSchema,
  operationSchema,
  rankingItemSchema
};
//# sourceMappingURL=index.mjs.map
export type ReadonlyOrderedRecord<T> = {
  data: Record<string, T>
  order: string[]
}

// Function to create a new ReadonlyOrderedRecord
export function createReadonlyOrderedRecord<T>(
  init: Record<string, T> = {},
  order?: string[]
): ReadonlyOrderedRecord<T> {
  const data = { ...init }
  const actualOrder =
    order && order.every(key => key in init) ? [...order] : Object.keys(init)
  return { data, order: actualOrder }
}

// Function to set a key-value pair
export function set<T>(
  record: ReadonlyOrderedRecord<T>,
  key: string,
  value: T
): ReadonlyOrderedRecord<T> {
  const newData = { ...record.data, [key]: value }
  const newOrder = record.order.includes(key)
    ? [...record.order]
    : [...record.order, key]
  return { data: newData, order: newOrder }
}

// Function to get a value by key
export function get<T>(
  record: ReadonlyOrderedRecord<T>,
  key: string
): T | undefined {
  return record.data[key]
}

// Function to delete a key-value pair
export function deleteKey<T>(
  record: ReadonlyOrderedRecord<T>,
  key: string
): ReadonlyOrderedRecord<T> {
  if (!(key in record.data)) {
    return record
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _, ...newData } = record.data
  const newOrder = record.order.filter(k => k !== key)
  return { data: newData, order: newOrder }
}

// Function to move a key to a new position in the order array
export function move<T>(
  record: ReadonlyOrderedRecord<T>,
  key: string,
  newIndex: number
): ReadonlyOrderedRecord<T> {
  const oldIndex = record.order.indexOf(key)
  if (oldIndex === -1) return record
  const newOrder = [...record.order]
  newOrder.splice(oldIndex, 1)
  newOrder.splice(newIndex, 0, key)
  return { data: record.data, order: newOrder }
}

// Function to get all values in order
export function values<T>(record: ReadonlyOrderedRecord<T>): T[] {
  return record.order.map(key => record.data[key])
}

// Function to get all entries as [key, value] pairs
export function entries<T>(record: ReadonlyOrderedRecord<T>): [string, T][] {
  return record.order.map(key => [key, record.data[key]] as [string, T])
}

// Function to convert to a plain object
export function toObject<T>(
  record: ReadonlyOrderedRecord<T>
): Record<string, T> {
  return { ...record.data }
}

// Function to get the order of keys
export function getOrder<T>(record: ReadonlyOrderedRecord<T>): string[] {
  return [...record.order]
}

// Function to get the size (number of entries)
export function size<T>(record: ReadonlyOrderedRecord<T>): number {
  return record.order.length
}

// Function to clear the record
export function clear<T>(): ReadonlyOrderedRecord<T> {
  return createReadonlyOrderedRecord<T>()
}

// Function to map over values and return a new ReadonlyOrderedRecord
export function map<T, U>(
  record: ReadonlyOrderedRecord<T>,
  callback: (value: T, key: string) => U
): ReadonlyOrderedRecord<U> {
  const newData: Record<string, U> = {}
  record.order.forEach(key => {
    newData[key] = callback(record.data[key], key)
  })
  return { data: newData, order: [...record.order] }
}

// Function to filter the record based on a predicate
export function filter<T>(
  record: ReadonlyOrderedRecord<T>,
  predicate: (value: T, key: string) => boolean
): ReadonlyOrderedRecord<T> {
  const newData: Record<string, T> = {}
  const newOrder: string[] = []
  record.order.forEach(key => {
    if (predicate(record.data[key], key)) {
      newData[key] = record.data[key]
      newOrder.push(key)
    }
  })
  return { data: newData, order: newOrder }
}

// Function to find a value based on a predicate
export function find<T>(
  record: ReadonlyOrderedRecord<T>,
  predicate: (value: T, key: string) => boolean
): T | undefined {
  const key = record.order.find(key => predicate(record.data[key], key))
  return key ? record.data[key] : undefined
}

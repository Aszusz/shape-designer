export class ReadonlyOrderedRecord<T> {
  private data: Record<string, T>
  private order: string[]

  constructor(init: Record<string, T> = {}, order?: string[]) {
    this.data = { ...init }
    if (order && order.every(key => key in init)) {
      this.order = [...order]
    } else {
      this.order = Object.keys(init)
    }
  }

  set(key: string, value: T): ReadonlyOrderedRecord<T> {
    const newData = { ...this.data, [key]: value }
    const newOrder = this.order.includes(key)
      ? [...this.order]
      : [...this.order, key]
    return new ReadonlyOrderedRecord<T>(newData, newOrder)
  }

  get(key: string): T | undefined {
    return this.data[key]
  }

  delete(key: string): ReadonlyOrderedRecord<T> {
    if (!(key in this.data)) {
      return this
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...newData } = this.data
    const newOrder = this.order.filter(k => k !== key)
    return new ReadonlyOrderedRecord<T>(newData, newOrder)
  }

  move(key: string, newIndex: number): ReadonlyOrderedRecord<T> {
    const oldIndex = this.order.indexOf(key)
    if (oldIndex === -1) return this
    const newOrder = [...this.order]
    newOrder.splice(oldIndex, 1)
    newOrder.splice(newIndex, 0, key)
    return new ReadonlyOrderedRecord<T>(this.data, newOrder)
  }

  entries(): [string, T][] {
    return this.order.map(key => [key, this.data[key]])
  }

  toObject(): Record<string, T> {
    return { ...this.data }
  }

  getOrder(): string[] {
    return [...this.order]
  }

  size(): number {
    return this.order.length
  }

  clear(): ReadonlyOrderedRecord<T> {
    return new ReadonlyOrderedRecord<T>()
  }

  map<U>(callback: (value: T, key: string) => U): ReadonlyOrderedRecord<U> {
    const newData: Record<string, U> = {}
    this.order.forEach(key => {
      newData[key] = callback(this.data[key], key)
    })
    return new ReadonlyOrderedRecord<U>(newData, [...this.order])
  }

  filter(
    predicate: (value: T, key: string) => boolean
  ): ReadonlyOrderedRecord<T> {
    const newData: Record<string, T> = {}
    const newOrder: string[] = []
    this.order.forEach(key => {
      if (predicate(this.data[key], key)) {
        newData[key] = this.data[key]
        newOrder.push(key)
      }
    })
    return new ReadonlyOrderedRecord<T>(newData, newOrder)
  }
}

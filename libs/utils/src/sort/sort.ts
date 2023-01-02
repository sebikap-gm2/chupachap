export const compareNumber = (a: number, b: number, asc = false) =>
  asc ? b - a : a - b

export const compareString = (a: string, b: string, asc = false) =>
  asc ? b.localeCompare(a) : a.localeCompare(b)

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never

export type SortableItem<T> = { id: string; data: T }

export const sortListByKey = <T>(
  list: SortableItem<T>[],
  keyToSort: DotNestedKeys<T>,
  asc = false
) => {
  const getValue = (item: SortableItem<T>) => {
    const keysToMap = (keyToSort as string).split('.')
    // TODO: type better
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentValue: any | string = item.data
    for (let j = 0; j < keysToMap.length; j++) {
      currentValue = currentValue[keysToMap[j] as keyof typeof currentValue]
    }
    return currentValue
  }
  const firstElementSortProperty = getValue(list[0])

  if (typeof firstElementSortProperty === 'string') {
    return list.sort((a, b) => compareString(getValue(a), getValue(b), asc))
  } else if (typeof firstElementSortProperty === 'number') {
    return list.sort((a, b) => compareNumber(getValue(a), getValue(b), asc))
  }
  return list
}

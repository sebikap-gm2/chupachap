import { useState } from 'react'
import { sortListByKey, DotNestedKeys } from '@chupachap/utils'
import { IListItem, ListItem } from './list-item'
import { useEffect } from 'react'

export type SortableProp<T> = {
  accessor: DotNestedKeys<T>
  title: string
  asc?: boolean
}

interface ListProps<T> {
  list: IListItem<T>[]
  onPressItem: (id: string) => void
  sortableProps?: SortableProp<T>[]
}

export const List =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends Record<string, any>>({
    list,
    onPressItem,
    sortableProps = [],
  }: ListProps<T>) => {
    const [currentSortProperty, setCurrentSortProperty] =
      useState<typeof sortableProps[number]>()
    const [items, setItems] = useState(list)

    const sortedList = (sortableProp: SortableProp<T> | undefined) => {
      if (!sortableProp) return list
      return sortListByKey<T>(list, sortableProp.accessor, sortableProp.asc)
    }

    useEffect(() => {
      setItems(sortedList(undefined))
    }, [])

    const handleSort = (newSortableProp: SortableProp<T>) => {
      const newProp =
        currentSortProperty?.accessor !== newSortableProp.accessor
          ? newSortableProp
          : { ...newSortableProp, asc: !currentSortProperty.asc }
      setCurrentSortProperty(newProp)
      setItems(sortedList(newProp))
    }

    return (
      <div style={{padding: '5 4 0 4', maxHeight:'100%'}}>
        <div style={{display: 'flex', flexDirection:"row", justifyContent:"space-between", marginBottom: 3}}>
          <div style={{height: 5}}>
            {!currentSortProperty ? 'recentTitle' : ''}
          </div>
          {/* <div style={{display: 'flex', flexDirection:"row", alignItems:"center"}}>
            {!!sortableProps.length && (
              <Menu
                placement="bottom right"
                trigger={(triggerProps) => (
                  <IconButton
                    size={4}
                    variant="unstyled"
                    icon={
                      <Icon
                        size={4}
                        color={iconColor}
                        as={Entypo}
                        name="dots-three-vertical"
                      />
                    }
                    {...triggerProps}
                  />
                )}
              >
                <Menu.Group title="sort">
                  {sortableProps.map((sortableProp) => (
                    <Menu.Item
                      key={sortableProp.accessor}
                      onPress={() => list.length && handleSort(sortableProp)}
                      bgColor={
                        currentSortProperty?.accessor === sortableProp.accessor
                          ? 'gray.200'
                          : undefined
                      }
                    >
                      {sortableProp.title}
                    </Menu.Item>
                  ))}
                </Menu.Group>
              </Menu>
            )}
          </div> */}
        </div>
        <div>
          {items.map(item => <ListItem item={item} onPressItem={onPressItem} />)}
        </div>
      </div>
    )
  }
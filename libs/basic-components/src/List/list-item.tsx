import { SortableItem } from '@chupachap/utils'
import { Pressable } from '../Pressable'

export type IListItem<T> = SortableItem<T> & {
  title?: string
  description?: string
}

interface ListItemProps<T> {
  item: IListItem<T>
  onPressItem: (id: string) => void
  single?: boolean
}

export const ListItem =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends Record<string, any>>({
    item,
    onPressItem,
  }: ListItemProps<T>) => {
    return (
      <Pressable
        onPress={() => onPressItem(item.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 3,
          borderWidth: 1,
          borderRadius: 5,
          padding: 4,
          borderColor: 'red',
        }}
      >
        <div style={{display: 'flex', flexDirection:"row", justifyContent:"center"}}>
          <div style={{display: 'flex', justifyContent:"center"}}>
            {item.title && <div>{item.title}</div>}
            {item.description && <div>{item.description}</div>}
          </div>
        </div>
      </Pressable>
    )
  }

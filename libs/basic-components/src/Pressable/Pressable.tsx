import { CSSProperties, ReactNode } from "react"

interface PressableProps {
  children: ReactNode
  onPress: () => void
  style?: CSSProperties
}
export const Pressable = ({children, onPress, style}: PressableProps) => {
  return (
    <div style={style}>
      {children}
    </div>
  )
}
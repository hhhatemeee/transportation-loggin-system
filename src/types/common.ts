import { AlertColor } from '@mui/material'

export type ItemType = {
  id: number
  value: string
  icon?: string
  options?: ItemType[]
  path?: string
  isSelected?: boolean
  isExpanded?: boolean
}

export type SnackType = AlertColor

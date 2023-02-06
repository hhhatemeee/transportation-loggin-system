import { FC } from 'react'
import { Checkbox as MUICheckbox, CheckboxProps as MUICheckboxProps } from '@mui/material'

export type CheckboxProps = MUICheckboxProps

export const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return <MUICheckbox {...props} />
}

import { FC } from 'react'

import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@mui/material'

export type TextFieldProps = MUITextFieldProps

export const TextField: FC<TextFieldProps> = props => {
  return <MUITextField {...props} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }} />
}

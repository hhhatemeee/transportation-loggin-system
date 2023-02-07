import { FC } from 'react'
import {
  DateTimePicker as MUIDateTimePicker,
  DateTimePickerProps as MUIDateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { isMoment } from 'moment'

import { TextField } from '../TextField'

export type DateTimePickerProps = {
  error?: boolean
  value?: string | null
  fullWidth?: boolean
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onChangeInput?: (value: string) => void
  size?: 'small' | 'medium'
} & Omit<MUIDateTimePickerProps<unknown, unknown>, 'renderInput' | 'onChange'>

export const DateTimePicker: FC<DateTimePickerProps> = ({
  size = 'small',
  value,
  onBlur,
  onChange,
  onChangeInput,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MUIDateTimePicker
        {...props}
        ampm={false}
        value={value ? moment(value) : null}
        InputProps={{ onBlur: e => onBlur?.(moment(e.target.value).toISOString()) }}
        onChange={value => isMoment(value) && onChange?.(value.toISOString())}
        renderInput={params => (
          <TextField
            fullWidth={props.fullWidth}
            error={props.error}
            size={size}
            onChange={({ target: { value } }) =>
              isMoment(value) && onChangeInput?.(value.toISOString())
            }
            {...params}
            inputProps={{ ...params.inputProps, 'data-testid': 'date-time-picker' }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

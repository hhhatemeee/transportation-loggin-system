import { FC, FocusEventHandler, ReactElement } from 'react'

import { RegisterOptions } from 'react-hook-form'
import { Grid, SxProps, Theme } from '@mui/material'
import moment from 'moment'

import { FormLabel } from './FormLabel'
import { TextFieldController } from '../../controllers/TextFieldController'
import { GENERATOR_INPUT_TYPE } from '../../types'
import { InputController } from '../../controllers/InputController'
import { DatePickerRangeController } from '../../controllers/DateTimePickerController/DatePickerRangeController'
import { DateRangeValue, LabelRangeType } from '../DatePickerRange'
import { CheckboxController } from '../../controllers/CheckboxController'

type CommonFormInputProps = {
  className?: string
  rules?: RegisterOptions
  label?: string
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'medium'
  loading?: boolean
  readOnly?: boolean
  value?: unknown
  variant?: 'outlined' | 'filled' | 'standard'
  sx?: SxProps<Theme>
  labelOver?: string
  labelLimit?: boolean
}

type InputFormProps = {
  type?: string
  replacePattern?: RegExp | string
  replaceBy?: string
  maxLengthInput?: number | false
  onBlurInput?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

export type DateRangeFormInputProps = {
  labelRange?: LabelRangeType
}

export type FormInputProps = {
  name: string
  inputType: GENERATOR_INPUT_TYPE
} & CommonFormInputProps &
  InputFormProps &
  DateRangeFormInputProps

export const FormInput: FC<FormInputProps> = ({
  rules,
  label,
  labelPlacement = 'start',
  inputType,
  name,
  disabled,
  placeholder,
  type,
  size = 'small',
  replacePattern,
  replaceBy = '',
  maxLengthInput = 255,
  readOnly,
  onBlurInput,
  variant,
  sx,
  className,
  value,
  labelOver,
  labelRange,
  labelLimit = true,
}) => {
  const getValue = () => {
    switch (inputType) {
      case GENERATOR_INPUT_TYPE.DATE_TIME_PICKER:
        return typeof value === 'string' ? value : null
      case GENERATOR_INPUT_TYPE.DATE_RANGE_PICKER:
        return Array.isArray(value) && !value.some(el => el instanceof Date)
          ? [moment(value[0]).format(), moment(value[1]).format()]
          : [null, null]
      default:
        return value
    }
  }

  const renderInput = (): ReactElement => {
    switch (inputType) {
      case GENERATOR_INPUT_TYPE.TEXTFIELD:
        return (
          <TextFieldController
            label={labelOver}
            fullWidth
            onBlur={onBlurInput}
            size={size}
            placeholder={placeholder ?? placeholder}
            name={name}
            InputProps={{ readOnly: readOnly }}
            rules={rules}
            disabled={disabled}
            type={type}
            maxLength={maxLengthInput}
            replacePattern={replacePattern}
            replaceBy={replaceBy}
            value={value}
            variant={variant}
            sx={sx}
            className={className}
          />
        )
      case GENERATOR_INPUT_TYPE.INPUT:
        return (
          <InputController
            fullWidth
            onBlur={onBlurInput}
            size={size}
            placeholder={placeholder ?? placeholder}
            name={name}
            readOnly={readOnly}
            rules={rules}
            disabled={disabled}
            type={type}
            maxLength={maxLengthInput}
            replacePattern={replacePattern}
            replaceBy={replaceBy}
            value={value}
            sx={sx}
            className={className}
          />
        )
      case GENERATOR_INPUT_TYPE.DATE_RANGE_PICKER:
        return (
          <DatePickerRangeController
            fullWidth
            readOnly={readOnly}
            rules={rules}
            name={name}
            disabled={disabled}
            value={getValue() as [DateRangeValue, DateRangeValue]}
            size={size}
            className={className}
            labelRange={labelRange}
          />
        )
      case GENERATOR_INPUT_TYPE.CHECKBOX:
        return (
          <CheckboxController
            rules={rules}
            name={name}
            disabled={disabled}
            value={getValue()}
            sx={sx}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <Grid
      item
      container={inputType !== GENERATOR_INPUT_TYPE.CHECKBOX}
      justifyContent='space-between'
      mb={1}
    >
      <FormLabel
        name={name}
        label={label}
        labelPlacement={labelPlacement}
        control={renderInput()}
        labelLimit={labelLimit}
      />
    </Grid>
  )
}

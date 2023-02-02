import { FC, FocusEventHandler, ReactElement } from 'react'

import { RegisterOptions } from 'react-hook-form'
import { Grid, SxProps, Theme } from '@mui/material'

import { FormLabel } from './FormLabel'
import { TextFieldController } from '../../controllers/TextFieldController'
import { GENERATOR_INPUT_TYPE } from '../../types'
import { InputController } from '../../controllers/InputController'


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
}

type InputFormProps = {
  type?: string
  replacePattern?: RegExp | string
  replaceBy?: string
  maxLengthInput?: number | false
  onBlurInput?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

export type FormInputProps = {
  name: string
  inputType: GENERATOR_INPUT_TYPE
} & CommonFormInputProps &
  InputFormProps

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
  labelOver
}) => {


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
      />
    </Grid>
  )
}

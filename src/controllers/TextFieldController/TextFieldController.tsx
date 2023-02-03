import { FC, FocusEventHandler } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { TextField, TextFieldProps } from '../../components/TextField'

type TextFieldControllerProps = {
  name: string
  rules?: RegisterOptions
  maxLength?: number | false
  replacePattern?: RegExp | string
  replaceBy?: string
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
} & TextFieldProps

export const TextFieldController: FC<TextFieldControllerProps> = ({
  rules,
  name,
  maxLength,
  replacePattern,
  replaceBy,
  value,
  onBlur,
  ...props
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: formValue }, fieldState: { invalid, error } }) => (
        <TextField
          error={invalid}
          value={value ?? formValue}
          onBlur={onBlur}
          onChange={e => {
            const formValue = maxLength ? e.target.value.slice(0, maxLength) : e.target.value
            onChange(
              replacePattern && replaceBy ? formValue.replace(replacePattern, replaceBy) : formValue
            )
          }}
          helperText={invalid && error?.message}
          {...props}
          sx={{ '.MuiFormHelperText-root.Mui-error': { position: 'absolute', bottom: -20 } }}
        />
      )}
      rules={rules}
    />
  )
}

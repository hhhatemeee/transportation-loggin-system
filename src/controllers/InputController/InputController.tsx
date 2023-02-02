import { FC, FocusEventHandler } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../../components/Input'

type InputControllerProps = {
  name: string
  rules?: RegisterOptions
  maxLength?: number | false
  replacePattern?: RegExp | string
  replaceBy?: string
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
} & InputProps

export const InputController: FC<InputControllerProps> = ({
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
        <Input
          error={invalid}
          id={name}
          value={value ?? formValue}
          onBlur={onBlur}
          onChange={e => {
            const formValue = maxLength ? e.target.value.slice(0, maxLength) : e.target.value
            onChange(replacePattern && replaceBy ? formValue.replace(replacePattern, replaceBy) : formValue)
          }}
          errorMessage={error?.message}
          {...props}
          sx={{ '.MuiFormHelperText-root.Mui-error': { position: 'absolute', bottom: -20 } }}
        />
      )}
      rules={rules}
    />
  )
}

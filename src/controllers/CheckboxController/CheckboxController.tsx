import { FC } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../../components/Checkbox'

type CheckboxControllerProps = {
  name: string
  rules?: RegisterOptions
} & CheckboxProps

export const CheckboxController: FC<CheckboxControllerProps> = ({
  rules,
  name,
  value,
  ...props
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: formValue } }) => (
        <Checkbox
          {...props}
          value={value ?? formValue}
          checked={value ?? formValue}
          onChange={onChange}
        />
      )}
      rules={rules}
    />
  )
}

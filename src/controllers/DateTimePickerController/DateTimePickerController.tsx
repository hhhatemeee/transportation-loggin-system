import { FC } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { DateTimePicker, DateTimePickerProps } from '../../components/DateTimePicker'

type DateTimePickerControllerProps = {
  name: string
  rules?: RegisterOptions
} & Omit<DateTimePickerProps, 'onChange' | 'renderInput'>

export const DateTimePickerController: FC<DateTimePickerControllerProps> = ({
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
      render={({ field: { onChange, value: formValue }, fieldState: { invalid } }) => (
        <DateTimePicker {...props} error={invalid} value={value ?? formValue} onChange={onChange} />
      )}
      rules={rules}
    />
  )
}

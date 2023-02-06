import { FC } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { DateRangeValue, DatePickerRange, LabelRangeType } from '../../components/DatePickerRange'
import { DateTimePickerProps } from '../../components/DateTimePicker'

type DatePickerRangeControllerProps = {
  labelRange?: LabelRangeType
  name: string
  rules?: RegisterOptions
  value?: [DateRangeValue, DateRangeValue]
  onBlur?: (value?: [DateRangeValue, DateRangeValue]) => void
} & Omit<DateTimePickerProps, 'onChange' | 'renderInput' | 'value' | 'onBlur'>

export const DatePickerRangeController: FC<DatePickerRangeControllerProps> = ({
  rules,
  name,
  value,
  onBlur,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: formValue }, fieldState: { invalid } }) => (
        <DatePickerRange
          {...props}
          onBlur={onBlur}
          onChange={onChange}
          value={formValue}
          error={invalid}
        />
      )}
      rules={rules}
    />
  )
}

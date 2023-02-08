import { FormInputProps } from '../components/FormGenerator/FormInput'

export enum GENERATOR_INPUT_TYPE {
  INPUT = 'INPUT',
  TEXTFIELD = 'TEXTFIELD',
  TEXTAREA = 'TEXTAREA',
  BUTTON = 'BUTTON',
  CHECKBOX = 'CHECKBOX',
  DATE_TIME_PICKER = 'DATE_TIME_PICKER',
  DATE_RANGE_PICKER = 'DATE_RANGE_PICKER',
  AUTOCOMPLETE = 'AUTOCOMPLETE',
}

type FormInputRowType = {
  name: string
  inputs: FormInputProps[]
}

export type FormInputsType = FormInputProps | FormInputRowType

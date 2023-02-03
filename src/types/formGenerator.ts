import { FormInputProps } from '../components/FormGenerator/FormInput'

export enum GENERATOR_INPUT_TYPE {
  INPUT = 'INPUT',
  TEXTFIELD = 'TEXTFIELD',
  BUTTON = 'BUTTON',
  CHECKBOX = 'CHECKBOX',
}

type FormInputRowType = {
  name: string
  inputs: FormInputProps[]
}

export type FormInputsType = FormInputProps | FormInputRowType

import { FC } from 'react'

import { FormInput } from './FormInput'
import { Grid } from '@mui/material'
import { FormInputsType, GENERATOR_INPUT_TYPE } from '../../types'

type FormGeneratorProps = {
  inputs: FormInputsType[]
  loading?: boolean
  isRow?: boolean
}

export const FormGenerator: FC<FormGeneratorProps> = ({ inputs, loading, isRow }) => {
  return (
    <Grid container spacing={2} flexWrap={isRow ? 'nowrap' : 'wrap'}>
      {inputs.map(input =>
        'inputs' in input ? (
          <Grid item flexWrap={'nowrap'} width={'100%'} key={input.name}>
            <FormGenerator inputs={input.inputs} isRow={true} loading={loading} />
          </Grid>
        ) : (
          <Grid
            item
            container
            key={input.name}
            width={input.inputType === GENERATOR_INPUT_TYPE.CHECKBOX ? 'auto' : `100%`}
          >
            <FormInput loading={loading} {...input} />
          </Grid>
        )
      )}
    </Grid>
  )
}

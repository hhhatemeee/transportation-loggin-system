import { Box } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FormGenerator } from '../../../../components/FormGenerator'
import { GENERATOR_INPUT_TYPE, StateNumberForm } from '../../../../types'
import { SumbutButton } from '../SumbutButton'

type StateNumberProps = {
  onSubmit: (data: StateNumberForm) => void
  submitBtnText: string
}

export const StateNumber: FC<StateNumberProps> = ({ onSubmit, submitBtnText }) => {
  const methods = useForm<StateNumberForm>({ defaultValues: { code: '' } })
  const { t } = useTranslation()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <FormGenerator
        inputs={[
          {
            name: 'code',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            labelOver: t('registrationCarPage.form.stateNumber.label'),
            size: 'medium',
            rules: {
              required: t('registrationCarPage.form.stateNumber.emptyError'),
            },
          },
        ]}
      />
      <Box mt={4}>
        <SumbutButton text={submitBtnText} onClick={handleSubmit(onSubmit)} />
      </Box>
    </FormProvider>
  )
}

import { Box } from '@mui/system'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FormGenerator } from '../../../../components/FormGenerator'
import { GENERATOR_INPUT_TYPE, STSForm } from '../../../../types'
import { SumbutButton } from '../SumbutButton'

type STSProps = {
  onSubmit: (data: STSForm) => void
  submitBtnText: string
}

export const STS: FC<STSProps> = ({ onSubmit, submitBtnText }) => {
  const methods = useForm<STSForm>()
  const { t } = useTranslation()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <FormGenerator
        inputs={[
          {
            name: 'code',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            labelOver: t('registrationPage.form.STS.label'),
            size: 'medium',
            rules: {
              required: t('registrationPage.form.STS.emptyError'),
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

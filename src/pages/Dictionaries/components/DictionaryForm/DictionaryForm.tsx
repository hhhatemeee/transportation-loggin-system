import { Grid } from '@mui/material'
import { useForm, FormProvider, FieldValues, DeepPartial } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../components/Button'
import { FormGenerator } from '../../../../components/FormGenerator'
import { FormInputsType } from '../../../../types'

type DictionaryFormProps<T> = {
  inputs: FormInputsType[]
  onAdd: (data: T) => void
  defaultValues: DeepPartial<T>
}

const DictionaryForm = <T extends FieldValues>({
  inputs,
  onAdd,
  defaultValues,
}: DictionaryFormProps<T>) => {
  const { t } = useTranslation()
  const methods = useForm<T>({
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  return (
    <Grid container flexDirection={'column'} spacing={1}>
      <Grid item>
        <FormProvider {...methods}>
          <FormGenerator inputs={inputs} />
        </FormProvider>
      </Grid>
      <Grid item alignSelf={'flex-end'}>
        <Button variant='contained' onClick={handleSubmit(onAdd)} disabled={!isDirty}>
          {t('buttons.addButton')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default DictionaryForm

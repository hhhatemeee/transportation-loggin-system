import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryServicesForm, GENERATOR_INPUT_TYPE } from '../../types'
import DictionaryForm from '../Dictionaries/components/DictionaryForm/DictionaryForm'

const defaultValues = { description: '', name: '' }

export const DictionaryServices: FC = () => {
  const { t } = useTranslation()

  const handleAdd = (data: DictionaryServicesForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.services.title')} />
      <DictionaryForm
        inputs={[
          {
            name: 'name',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            size: 'medium',
            labelOver: t('dictionaries.services.form.name.label'),
          },
          {
            name: 'description',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            size: 'medium',
            labelOver: t('dictionaries.services.form.description.label'),
          },
        ]}
        onAdd={handleAdd}
        defaultValues={defaultValues}
      />
    </Grid>
  )
}

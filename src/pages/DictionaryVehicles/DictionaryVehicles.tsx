import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryVehiclesForm, GENERATOR_INPUT_TYPE } from '../../types'
import DictionaryForm from '../Dictionaries/components/DictionaryForm/DictionaryForm'

const defaultValues = { counterpart: null, model: '', stateNumber: '', STS: '' }

export const DictionaryVehicles: FC = () => {
  const { t } = useTranslation()

  const handleAdd = (data: DictionaryVehiclesForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.vehicles.title')} />
      <DictionaryForm
        onAdd={handleAdd}
        inputs={[
          {
            name: 'stateNumber',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            labelOver: t('dictionaries.vehicles.form.stateNumber.label'),
          },
          {
            name: 'model',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            labelOver: t('dictionaries.vehicles.form.model.label'),
          },
          {
            name: 'STS',
            inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
            labelOver: t('dictionaries.vehicles.form.STS.label'),
          },
          {
            name: 'counterpart',
            inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
            labelOver: t('dictionaries.vehicles.form.counterpart.label'),
            autocompleteOptions: [],
          },
        ]}
        defaultValues={defaultValues}
      />
    </Grid>
  )
}

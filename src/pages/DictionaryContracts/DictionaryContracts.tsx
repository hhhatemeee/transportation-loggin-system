import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryContractsForm, GENERATOR_INPUT_TYPE } from '../../types'
import DictionaryForm from '../Dictionaries/components/DictionaryForm/DictionaryForm'

const defaultValues = { counterpart: null, dateEnd: null, dateStart: null, vehicles: null }

export const DictionaryContracts: FC = () => {
  const { t } = useTranslation()

  const handleAdd = (data: DictionaryContractsForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.contracts.title')} />
      <DictionaryForm
        inputs={[
          {
            name: 'dateStart',
            inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
            labelOver: t('dictionaries.contracts.form.dateStart.label'),
          },
          {
            name: 'dateEnd',
            inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
            labelOver: t('dictionaries.contracts.form.dateEnd.label'),
          },
          {
            name: 'vehicles',
            inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
            labelOver: t('dictionaries.contracts.form.vehicles.label'),
            autocompleteOptions: [],
          },
          {
            name: 'counterpart',
            inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
            labelOver: t('dictionaries.contracts.form.counterpart.label'),
            autocompleteOptions: [],
          },
        ]}
        onAdd={handleAdd}
        defaultValues={defaultValues}
      />
    </Grid>
  )
}

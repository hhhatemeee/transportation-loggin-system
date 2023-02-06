import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryCounterpartiesForm, GENERATOR_INPUT_TYPE } from '../../types'
import DictionaryForm from '../Dictionaries/components/DictionaryForm/DictionaryForm'

const defaultValues = {
  address: '',
  bank: '',
  bik: '',
  inn: '',
  kpp: '',
  ks: '',
  name: '',
  payment: '',
}

export const DictionaryCounterparties: FC = () => {
  const { t } = useTranslation()

  const handleAdd = (data: DictionaryCounterpartiesForm) => console.log(data)

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.counterparties.title')} />
      <DictionaryForm
        onAdd={handleAdd}
        defaultValues={defaultValues}
        inputs={[
          {
            inputs: [
              {
                name: 'name',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.name.label'),
              },
              {
                name: 'payment',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.payment.label'),
              },
            ],
            name: 'row1',
          },
          {
            inputs: [
              {
                name: 'address',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.address.label'),
              },
              {
                name: 'bank',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.bank.label'),
              },
            ],
            name: 'row2',
          },
          {
            inputs: [
              {
                name: 'inn',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.inn.label'),
              },
              {
                name: 'bik',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.bik.label'),
              },
            ],
            name: 'row3',
          },
          {
            inputs: [
              {
                name: 'kpp',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.kpp.label'),
              },
              {
                name: 'ks',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('dictionaries.counterparties.form.ks.label'),
              },
            ],
            name: 'row4',
          },
        ]}
      />
    </Grid>
  )
}

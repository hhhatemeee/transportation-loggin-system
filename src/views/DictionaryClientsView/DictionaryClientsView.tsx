import { Grid } from '@mui/material'
import { FC, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryClientContext } from '../../pages/DictionaryClients'
import { useAddClientMutation } from '../../redux/api/clients.api'
import { DictionaryClientForm, GENERATOR_INPUT_TYPE } from '../../types'

const defaultValues: DictionaryClientForm = {
  address: '',
  bank: '',
  bik: '',
  inn: '',
  kpp: '',
  ks: '',
  name: '',
  rs: '',
}

export const DictionaryClientsView: FC = () => {
  const { t } = useTranslation()
  const { addClient } = useContext(DictionaryClientContext)
  const methods = useForm<DictionaryClientForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods

  const handleAdd = (data: DictionaryClientForm) => {
    addClient({ ...data, email: '123' })
      .unwrap()
      .then(res => reset())
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.counterparties.title')} />
      <Grid container flexDirection={'column'} spacing={1}>
        <Grid item>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  inputs: [
                    {
                      name: 'name',
                      inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                      labelOver: t('dictionaries.counterparties.form.name.label'),
                    },
                    {
                      name: 'rs',
                      inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                      labelOver: t('dictionaries.counterparties.form.rs.label'),
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
          </FormProvider>
        </Grid>
        <Grid item alignSelf={'flex-end'}>
          <Button variant='contained' onClick={handleSubmit(handleAdd)} disabled={!isDirty}>
            {t('buttons.addButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

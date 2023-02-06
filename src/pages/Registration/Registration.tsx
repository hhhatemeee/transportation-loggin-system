import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import { PageTitle } from '../../components/PageTitle'

export const Registration: FC = () => {
  const { t } = useTranslation()
  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('registrationPage.title')} />
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  )
}

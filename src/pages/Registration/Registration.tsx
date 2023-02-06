import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

export const Registration: FC = () => {
  const { t } = useTranslation()
  return (
    <Grid container flexDirection={'column'}>
      <Grid item alignSelf={'center'} mb={5}>
        <Typography variant='h5' fontWeight={'600'}>
          {t('registrationPage.title')}
        </Typography>
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  )
}

import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const Registration: FC = () => {
  return (
    <Grid container flexDirection={'column'}>
      <Grid item alignSelf={'center'} mb={5}>
        <Typography variant='h5' fontWeight={'600'}>
          Регистрация
        </Typography>
      </Grid>
      <Grid item>
        {' '}
        <Outlet />
      </Grid>
    </Grid>
  )
}

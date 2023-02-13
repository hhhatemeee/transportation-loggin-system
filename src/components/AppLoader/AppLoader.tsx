import { FC } from 'react'
import { Grid, CircularProgress } from '@mui/material'

export const AppLoader: FC = () => {
  return (
    <Grid
      sx={{ height: '100vh', width: '100%' }}
      alignItems={'center'}
      justifyContent={'center'}
      container
    >
      <CircularProgress size='4rem' />
    </Grid>
  )
}

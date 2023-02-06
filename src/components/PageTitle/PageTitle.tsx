import { Grid, Typography } from '@mui/material'
import { FC } from 'react'

type PageTitleProps = {
  title: string
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <Grid item alignSelf={'center'} mb={5}>
      <Typography variant='h5' fontWeight={'600'}>
        {title}
      </Typography>
    </Grid>
  )
}

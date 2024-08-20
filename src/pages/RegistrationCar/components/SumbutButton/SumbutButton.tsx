import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { Button, ButtonProps } from '../../../../components/Button'

type SubmitButtonProps = {
  text: string
} & ButtonProps

export const SumbutButton: FC<SubmitButtonProps> = ({ text, ...props }) => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={5} md={5} lg={5}>
        <Button {...props} variant={'contained'} sx={{ py: 1, width: '100%' }}>
          {text}
        </Button>
      </Grid>
    </Grid>
  )
}

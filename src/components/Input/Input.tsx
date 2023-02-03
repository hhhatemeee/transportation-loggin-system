import { FC } from 'react'

import { Grid, OutlinedInput, OutlinedInputProps, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

export type InputProps = {
  errorMessage?: string
} & OutlinedInputProps

export const Input: FC<InputProps> = ({ errorMessage, ...props }) => {
  return (
    <Grid container flexDirection={'column'}>
      <Grid item>
        <OutlinedInput {...props} />
      </Grid>
      {errorMessage && (
        <Grid item>
          <Typography color={red[700]} sx={{ ml: 2, position: 'absolute' }} fontSize={'0.75rem'}>
            {errorMessage}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

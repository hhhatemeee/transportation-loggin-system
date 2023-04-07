import { FC } from 'react'

import type { SnackbarProps as MUISnackbarProps } from '@mui/material'
import { Alert, Paper, Snackbar as MUISnackbar } from '@mui/material'

import { SnackType } from '../../types'

type SnackbarProps = MUISnackbarProps & { type: SnackType; statusCode?: number }

export const Snackbar: FC<SnackbarProps> = ({ message, type, statusCode, ...props }) => {
  const status = statusCode ? `${statusCode}: ` : ''
  return (
    <MUISnackbar {...props} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Paper elevation={1}>
        <Alert sx={{ maxWidth: 600, minWidth: 300 }} severity={type}>
          {`${status}${message}`}
        </Alert>
      </Paper>
    </MUISnackbar>
  )
}

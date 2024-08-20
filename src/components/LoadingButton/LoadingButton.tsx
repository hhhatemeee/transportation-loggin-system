import { FC } from 'react'
import { CircularProgress } from '@mui/material'

import { Button, ButtonProps } from '../Button'

export const LoadingButton: FC<ButtonProps & { loading?: boolean }> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <CircularProgress size='1.6rem' color={'inherit'} /> : children}
    </Button>
  )
}

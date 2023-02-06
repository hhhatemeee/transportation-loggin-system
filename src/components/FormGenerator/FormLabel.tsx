import { FC } from 'react'
import { FormControlLabel, FormControlLabelProps, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { MIN_LABEL_WIDTH } from '../../constants'

type FormLabelProps = {
  name: string
  label?: string
  labelPlacement: 'end' | 'start' | 'top' | 'bottom'
  control: FormControlLabelProps['control']
  labelLimit?: boolean
}

export const FormLabel: FC<FormLabelProps> = ({
  labelLimit,
  label = '',
  labelPlacement,
  control,
}) => {
  return (
    <FormControlLabel
      sx={{
        width: '100%',
        m: 0,
        '*': {
          transition: '0.2s ease-in',
        },
        ...(labelPlacement === 'top' && { alignItems: 'start' }),
      }}
      control={control}
      labelPlacement={labelPlacement}
      label={
        label ? (
          <Typography
            title={label}
            sx={{
              // mr: 3,
              color: grey[700],

              ...(labelPlacement === 'top' && {
                mb: 1,
                width: '100%',
                // whiteSpace: 'nowrap',
              }),
              ...(labelLimit && {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: MIN_LABEL_WIDTH,
              }),
            }}
          >
            {label}
          </Typography>
        ) : (
          <></>
        )
      }
    />
  )
}

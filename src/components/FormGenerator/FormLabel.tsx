import { FC } from 'react'
import { FormControlLabel, FormControlLabelProps, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { MIN_LABEL_WIDTH } from '../../constants'

type FormLabelProps = {
  name: string
  label?: string
  labelPlacement: 'end' | 'start' | 'top' | 'bottom'
  control: FormControlLabelProps['control']
}

export const FormLabel: FC<FormLabelProps> = ({ name, label = '', labelPlacement, control }) => {
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
              width: MIN_LABEL_WIDTH,
              color: grey[700],
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ...(labelPlacement === 'top' && {
                mb: 1,
                width: '100%',
                // whiteSpace: 'nowrap',
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

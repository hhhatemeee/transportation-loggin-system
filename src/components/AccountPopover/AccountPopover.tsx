import { Settings } from '@mui/icons-material'
import { Avatar, Chip } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { FC } from 'react'

export const AccountPopover: FC = () => {
  return (
    <Chip
      onClick={() => console.log()}
      avatar={
        <Avatar variant='circular' sx={{ border: 1, borderColor: blue[600] }}>
          A
        </Avatar>
      }
      label={<Settings color='primary' sx={{ display: 'flex' }} />}
      size={'medium'}
      variant={'filled'}
      sx={{
        height: '42px',
        bgcolor: grey[200],
        alignItems: 'center',
        borderRadius: '27px',
        '& .MuiChip-avatar': {
          width: 30,
          height: 30,
          fontSize: 15,
          color: 'white',
        },
      }}
    />
  )
}

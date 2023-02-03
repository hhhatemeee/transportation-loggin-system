import { Settings } from '@mui/icons-material'
import { Avatar, Chip } from '@mui/material'
import { deepPurple, grey } from '@mui/material/colors'
import { FC } from 'react'

export const AccountPopover: FC = () => {
  return (
    <Chip
      onClick={() => console.log()}
      avatar={
        <Avatar variant='circular' sx={{ border: 1, borderColor: deepPurple[300] }}>
          A
        </Avatar>
      }
      label={<Settings sx={{ display: 'flex', color: deepPurple[600] }} />}
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

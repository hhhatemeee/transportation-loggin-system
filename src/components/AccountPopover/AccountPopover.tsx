import { Settings } from '@mui/icons-material'
import { Avatar, Chip, Divider, ListItemButton, Popover } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../../hooks/auth'

export const AccountPopover: FC = () => {
  const { onLogout, user } = useAuth()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Chip
        aria-describedby={'account_menu'}
        onClick={handlePopoverOpen}
        avatar={
          <Avatar variant='circular' sx={{ border: 1, borderColor: blue[600] }}>
            {user?.firstname[0]}
            {user?.lastname[0]}
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        id={'account_menu'}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ListItemButton>{t('accountMenu.profile')}</ListItemButton>
        <Divider />
        <ListItemButton onClick={onLogout}>{t('accountMenu.logout')}</ListItemButton>
      </Popover>
    </>
  )
}

import { FC, ReactNode } from 'react'

import { styled } from '@mui/material/styles'
import { Box, Drawer } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { DRAWER_WIDTH } from '../../constants'

// import { NavList } from '../NavList'
// import { ProfileMenu } from '../ProfileMenu'
// import { NavOptionProps } from '../../types'


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

type SidebarProps = {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export const Sidebar: FC<SidebarProps> = ({ children, open, onClose }) => {
  return (
    <Main open={open}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant='persistent'
          open={open}
          anchor='left'
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          {/* <ProfileMenu />
          <NavList
            isChild={false}
            title={t('navigation')}
            // hideText={!open}
            options={options}
            onSelected={onSelected}
          /> */}
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Main>
  )
}

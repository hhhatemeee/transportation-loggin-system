import { FC } from 'react'

import { AppBar as MUIAppBar, Box, Grid, IconButton, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

import MenuIcon from '@mui/icons-material/Menu'
import { DRAWER_WIDTH } from '../../constants'
import { AccountPopover } from '../AccountPopover'

type AppBarProps = {
  open: boolean
  onOpen?: (sidebarOpen: boolean) => void
}

const StyledAppBar = styled(MUIAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  '& .MuiToolbar-root': {
    paddingLeft: theme.spacing(2),
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none',
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const Header: FC<AppBarProps> = ({ open, onOpen }) => {
  const toggleColorMode = () => {
    // const newMode = mode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT
    // dispatch(setThemeMode(newMode))
    // localStorage.setItem('mode', newMode)
  }

  const handleClick = () => {
    onOpen?.(true)
  }

  return (
    <StyledAppBar open={open} position='static' color='inherit'>
      <Toolbar>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Box>
              <Grid container alignItems='center'>
                <Grid item>
                  {!open && (
                    <IconButton sx={{ mr: 3 }} onClick={handleClick}>
                      <MenuIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>SUPER NAME SERVICE</Grid>
          <Grid item>
            <Grid container alignItems={'center'}>
              <AccountPopover />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}

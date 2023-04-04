import { FC, ReactNode } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { indigo } from '@mui/material/colors'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box component={'main'} sx={{ bgcolor: indigo[50], p: 0, maxWidth: '100%' }}>
      <CssBaseline />
      <Box
        sx={{
          justifyContent: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

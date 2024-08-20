import { Box, SxProps, Theme } from '@mui/material'
import { FC, ReactNode } from 'react'

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
  isAlwaysRendered?: boolean
  hidden?: boolean
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

export const TabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  contentSx,
  isAlwaysRendered = false,
  ...other
}) => {
  return (
    <Box role='tabpanel' hidden={value !== index} {...other}>
      {(value === index || isAlwaysRendered) && <Box sx={{ p: 3, ...contentSx }}>{children}</Box>}
    </Box>
  )
}

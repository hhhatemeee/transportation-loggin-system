import {
  Box,
  Collapse,
  Icon,
  Link,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { FC, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ItemType } from '../../types/common'
import { NavList } from '../NavList'

type NavItemType = {
  item: ItemType
} & ListItemButtonProps

const textStyles: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.5px',
  color: grey[800],
  textDecoration: 'none',
}

export const NavItem: FC<NavItemType> = ({ children, item, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(!isOpen)

  return (
    <Link
      to={item.path || '/empty'}
      component={item.options?.length ? Box : RouterLink}
      sx={textStyles}
    >
      <ListItemButton {...props} sx={{ borderRadius: 2, fontSize: 18 }} onClick={handleOpen}>
        <Icon sx={{ mr: 1 }} fontSize={'medium'} style={{ color: grey[500] }}>
          {item.icon}
        </Icon>
        <ListItemText>{item.value}</ListItemText>
      </ListItemButton>
      {item.options?.length && (
        <Collapse in={isOpen}>
          <NavList options={item.options} isChild />
        </Collapse>
      )}
    </Link>
  )
}

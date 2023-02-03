import { List, ListProps } from '@mui/material'
import React, { FC } from 'react'
import { ItemType } from '../../types/common'
import { NavItem } from '../NavItem'

type NavListProps = {
  options: ItemType[]
  isChild?: boolean
} & ListProps

export const NavList: FC<NavListProps> = ({ options, isChild, ...props }) => {
  return (
    <List {...props} sx={{ pl: isChild ? 1 : 0 }}>
      {options.map(item => (
        <NavItem key={item.id} item={item} />
      ))}
    </List>
  )
}

import React from 'react'
import { useAppSelector } from '../../hooks/redux'

export const EmptyPage = () => {
  const user = useAppSelector(state => state.auth.user)
  return <div>{user?.firstname} {user?.lastname}</div>
}

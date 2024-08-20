import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '../../constants'
import { useAuth } from '../../hooks/auth'
import { AppLayout } from '../AppLayout'

export const PrivateRoute = () => {
  // состояние авторизации берется из стейта созданного в auth Slice
  const { isAuth } = useAuth()

  return isAuth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  )
}

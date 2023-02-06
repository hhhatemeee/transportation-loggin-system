import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from '../../constants'

import { EmptyPage } from '../../pages/EmptyPage'
import { Login } from '../../pages/Login'
import { Registration } from '../../pages/Registration'
import { RegistrationArrival } from '../../pages/RegistrationArrival'
import { RegistrationDeparture } from '../../pages/RegistrationDeparture'
import { AppLayout } from '../AppLayout'

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.EMPTY,
        element: <EmptyPage />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <Registration />,
        children: [
          {
            path: ROUTES.REGISTRATION_ARRIVAL,
            element: <RegistrationArrival />,
          },
          {
            path: ROUTES.REGISTRATION_DEPARTURE,
            element: <RegistrationDeparture />,
          },
        ],
      },
    ],
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}

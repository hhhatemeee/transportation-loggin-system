import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from '../../constants'

import { EmptyPage } from '../../pages/EmptyPage'
import { History } from '../../pages/History'
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
      {
        path: ROUTES.HISTORY,
        element: <History />,
      },
    ],
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { EmptyPage } from '../../pages/EmptyPage'
import { Login } from '../../pages/Login'
import { AppLayout } from '../AppLayout'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/empty',
        element: <EmptyPage />,
      },
    ],
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}

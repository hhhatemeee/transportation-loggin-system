import { useRoutes } from 'react-router-dom'
import { ROUTES } from '../../constants'

import { DictionaryContracts } from '../../pages/DictionaryContracts'
import { DictionaryClients } from '../../pages/DictionaryClients'
import { DictionaryServices } from '../../pages/DictionaryServices'
import { DictionaryCars } from '../../pages/DictionaryCars'
import { EmptyPage } from '../../pages/EmptyPage'
import { History } from '../../pages/History'
import { Login } from '../../pages/Login'
import { RegistrationCar } from '../../pages/RegistrationCar'
import { RegistrationArrival } from '../../pages/RegistrationArrival'
import { RegistrationDeparture } from '../../pages/RegistrationDeparture'
import { RegistrationOrder } from '../../pages/RegistrationOrder'
import { Reports } from '../../pages/Reports'
import { ReportsCounterparties } from '../../pages/ReportsCounterparties'
import { ReportsStatistics } from '../../pages/ReportsStatistics'
import { PrivateRoute } from '../PrivateRoute'

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/*',
          element: <EmptyPage />,
        },
        {
          path: ROUTES.REGISTRATION,
          element: <RegistrationCar />,
          children: [
            {
              path: ROUTES.REGISTRATION_ARRIVAL,
              element: <RegistrationArrival />,
            },
            {
              path: ROUTES.REGISTRATION_DEPARTURE,
              element: <RegistrationDeparture />,
            },
            {
              path: ROUTES.REGISTRATION_ORDER,
              element: <RegistrationOrder />,
            },
          ],
        },
        {
          path: ROUTES.HISTORY,
          element: <History />,
        },
        {
          path: ROUTES.REPORTS,
          element: <Reports />,
          children: [
            {
              path: ROUTES.REPORTS_COUNTERPARTIES,
              element: <ReportsCounterparties />,
            },
            {
              path: ROUTES.REPORTS_STATISTICS,
              element: <ReportsStatistics />,
            },
          ],
        },
        {
          path: ROUTES.DICTIONARY,
          children: [
            {
              path: ROUTES.DICTIONARY_CONTRACTS,
              element: <DictionaryContracts />,
            },
            {
              path: ROUTES.DICTIONARY_COUNTERPARTIES,
              element: <DictionaryClients />,
            },
            {
              path: ROUTES.DICTIONARY_SERVICES,
              element: <DictionaryServices />,
            },
            {
              path: ROUTES.DICTIONARY_VEHICLES,
              element: <DictionaryCars />,
            },
          ],
        },
      ],
    },
  ])

  return routes
}

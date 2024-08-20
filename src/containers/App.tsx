import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SnackMessage } from '../components/SnackMessage'
import AuthProvider from './AuthProvider/AuthProvider'
import { AppRoutes } from './AppRoutes'
import { store } from '../redux/store'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
          <SnackMessage />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App

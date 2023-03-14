import { Provider } from 'react-redux'

import { AppRoutes } from './AppRoutes'
import { store } from '../redux/store'
import AuthProvider from './AuthProvider/AuthProvider'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App

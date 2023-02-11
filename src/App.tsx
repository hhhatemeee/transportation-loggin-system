import { Provider } from 'react-redux'

import { AppRoutes } from './containers/AppRoutes'
import { store } from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default App

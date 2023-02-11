import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { commonAPI } from './api'
import { rootReducer } from './reducers/root.reducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commonAPI.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

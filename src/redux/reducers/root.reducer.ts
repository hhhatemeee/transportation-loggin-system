import { combineReducers } from '@reduxjs/toolkit'

import { commonAPI } from '../api'
import authReducer from './auth.reducer'
import snackbarReducer from './snackbar.reducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  [commonAPI.reducerPath]: commonAPI.reducer,
})

import { combineReducers } from '@reduxjs/toolkit'

import { commonAPI } from '../api'
import authReducer from './auth.reducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  [commonAPI.reducerPath]: commonAPI.reducer,
})

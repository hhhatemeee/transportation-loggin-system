import { useContext } from 'react'

import { AuthProviderContext } from '../containers/AuthProvider'

export const useAuth = () => useContext(AuthProviderContext)

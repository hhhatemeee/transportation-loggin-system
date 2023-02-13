import { createContext, FC, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { AuthState, LoginForm } from '../../types'
import { setLogin, setUser } from '../../redux/reducers/auth.reducer'
import { useLoginMutation } from '../../redux/api/auth.api'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../../redux/api/user.api'
import { AppLoader } from '../../components/AppLoader'

type AuthProviderContextProps = {
  onLogin: (data: LoginForm) => Promise<string>
  onCheckAuth: () => void
  loading: boolean
} & AuthState

export const AuthProviderContext = createContext<AuthProviderContextProps>(
  {} as AuthProviderContextProps
)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { isAuth, user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const cookieToken = Cookies.get('jwt')

  const { refetch, isError, isLoading, isFetching } = useGetUserQuery(undefined, { skip: !cookieToken })

  const loading = isLoading || isFetching

  const handleLogin = (data: LoginForm) =>
    login(data)
      .unwrap()
      .then(({ token }) => {
        dispatch(setLogin(token))
        return token
      })

  const handleCheckAuth = () => {
    refetch()
      .unwrap()
      .then(user => dispatch(setUser(user)))
  }

  if (cookieToken && !isAuth && !isError) {
    return <AppLoader />
  }

  return (
    <AuthProviderContext.Provider
      value={{ isAuth, user, loading, onLogin: handleLogin, onCheckAuth: handleCheckAuth }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthProvider

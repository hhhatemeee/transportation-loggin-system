import { createContext, FC, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { AuthState, LoginForm, ReturnLoginType } from '../../types'
import { setLogin, setUser } from '../../redux/reducers/auth.reducer'
import { useLoginMutation } from '../../redux/api/auth.api'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../../redux/api/user.api'
import { AppLoader } from '../../components/AppLoader'
import { COOKIES_DATA, ROUTES } from '../../constants'

type AuthProviderContextProps = {
  onLogin: (data: LoginForm) => Promise<ReturnLoginType>
  onLogout: () => void
  onCheckAuth: () => void
  loading: boolean
  loginLoading: boolean
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
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const cookieToken = Cookies.get(COOKIES_DATA.ACCESS_TOKEN)

  const { refetch, isError, isLoading, isFetching } = useGetUserQuery(undefined, {
    skip: !cookieToken,
  })

  const loading = isLoading || isFetching

  const handleLogin = (data: LoginForm) =>
    login(data)
      .unwrap()
      .then(res => {
        dispatch(setLogin(res))
        return res
      })

  const handleLogout = () => {
    dispatch(setLogin(null))
    navigate(ROUTES.LOGIN)
  }

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
      value={{
        isAuth,
        user,
        loading,
        loginLoading: isLoginLoading,
        onLogin: handleLogin,
        onCheckAuth: handleCheckAuth,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}

export default AuthProvider

import { FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'

import { FormGenerator } from '../../components/FormGenerator'
import { AuthForm } from '../../components/AuthForm'
import { Layout } from '../../components/Layout'
import { useAuth } from '../../hooks/auth'
import { ROUTES } from '../../constants'
import { GENERATOR_INPUT_TYPE, LoginForm } from '../../types'

const defaultValues = { username: '', password: '' }

export const Login = () => {
  const { t } = useTranslation()
  const methods = useForm<LoginForm>({ defaultValues })
  const { handleSubmit } = methods
  const { isAuth, onLogin, loginLoading } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    return <Navigate to={ROUTES.EMPTY} />
  }

  const handleSignIn = (data: LoginForm) => {
    onLogin(data).then(() => navigate(ROUTES.EMPTY))
  }

  const handleRegistration = () => navigate(ROUTES.REGISTRATION)

  return (
    <Layout>
      <AuthForm
        footerText={t('loginPage.registration')}
        onFooterText={handleRegistration}
        onSubmit={handleSubmit(handleSignIn)}
        formText={t('loginPage.singIn')}
        submitLoading={loginLoading}
      >
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                name: 'username',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('loginPage.form.username.label'),
                type: 'email',
                size: 'medium',
                rules: { required: t('loginPage.form.username.emptyError') },
              },
              {
                name: 'password',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('loginPage.form.password.label'),
                type: 'password',
                size: 'medium',
                rules: { required: t('loginPage.form.password.emptyError') },
              },
            ]}
          />
        </FormProvider>
      </AuthForm>
    </Layout>
  )
}

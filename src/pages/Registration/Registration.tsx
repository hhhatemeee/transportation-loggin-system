import { t } from 'i18next'
import { FC } from 'react'
import { AuthForm } from '../../components/AuthForm'
import { Layout } from '../../components/Layout'
import { Navigate, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { FormProvider, useForm } from 'react-hook-form'
import { FormGenerator } from '../../components/FormGenerator'
import { useAuth } from '../../hooks/auth'
import { GENERATOR_INPUT_TYPE, RegistrationForm } from '../../types'

const defaultValues: RegistrationForm = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  confirmPassword: '',
}

export const Registration: FC = () => {
  const navigate = useNavigate()
  const methods = useForm<RegistrationForm>({ defaultValues })
  const { handleSubmit } = methods
  const { onRegister, isAuth, registerLoading } = useAuth()

  if (isAuth) {
    return <Navigate to={ROUTES.EMPTY} />
  }

  const handleLogin = () => navigate(ROUTES.LOGIN)

  const handleSignUp = (data: RegistrationForm) => {
    onRegister(data)
  }

  return (
    <Layout>
      <AuthForm
        footerText={t('registrationPage.login')}
        onFooterText={handleLogin}
        onSubmit={handleSubmit(handleSignUp)}
        formText={t('registrationPage.subTitle')}
        submitLoading={registerLoading}
      >
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                name: 'firstname',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('registrationPage.form.firstname.label'),
                size: 'medium',
              },
              {
                name: 'lastname',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('registrationPage.form.lastname.label'),
                size: 'medium',
              },
              {
                name: 'username',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('registrationPage.form.username.label'),
                size: 'medium',
              },
              {
                name: 'password',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('registrationPage.form.password.label'),
                type: 'password',
                size: 'medium',
              },
              {
                name: 'confirmPassword',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('registrationPage.form.confirmPassword.label'),
                type: 'password',
                size: 'medium',
              },
            ]}
          />
        </FormProvider>
      </AuthForm>
    </Layout>
  )
}

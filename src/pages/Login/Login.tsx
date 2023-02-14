import { Box, CssBaseline, Divider, Grid, Typography } from '@mui/material'
import { deepPurple, grey, indigo } from '@mui/material/colors'
import { FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'
import { ROUTES } from '../../constants'
import { useAuth } from '../../hooks/auth'
import { GENERATOR_INPUT_TYPE, LoginForm } from '../../types'

const defaultValues = { username: '', password: '' }

export const Login = () => {
  const { t } = useTranslation()
  const methods = useForm<LoginForm>({ defaultValues })
  const { handleSubmit } = methods
  const { isAuth, onLogin } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    return <Navigate to={ROUTES.EMPTY} />
  }

  const handleSignIn = (data: LoginForm) => {
    onLogin(data).then(() => navigate('/'))
  }

  return (
    <Box component={'main'} sx={{ bgcolor: indigo[50], p: 0, maxWidth: '100%' }}>
      <CssBaseline />
      <Box
        sx={{
          justifyContent: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: 400, lg: 475 },
            bgcolor: 'white',
            borderRadius: 3,
            p: 5,
          }}
        >
          <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Grid item mb={2}>
              <Typography fontWeight={600}>{t('logo')}</Typography>
            </Grid>
            <Grid>
              <Grid item container alignItems={'center'} flexDirection={'column'} mb={4}>
                <Grid item>
                  <Typography fontWeight={600} fontSize={24} color={deepPurple[600]}>
                    {t('loginPage.welcome')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={14} color={grey[600]}>
                    {t('loginPage.subTitle')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item mb={3}>
              <Typography fontWeight={500} fontSize={18} color={grey[600]}>
                {t('loginPage.singIn')}
              </Typography>
            </Grid>
            <Grid item>
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
              <Grid item mt={3} mb={3}>
                <Button
                  onClick={handleSubmit(handleSignIn)}
                  variant='contained'
                  sx={{ bgcolor: deepPurple[600], fontWeight: 600, py: 1 }}
                  fullWidth
                >
                  {t('loginPage.singInBtn')}
                </Button>
              </Grid>
              <Divider />
            </Grid>
            <Grid item mt={1}>
              <Typography fontSize={14} fontWeight={600} component={'a'} sx={{ cursor: 'pointer' }}>
                {t('loginPage.registration')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

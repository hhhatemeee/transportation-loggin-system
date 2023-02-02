import { Box, Container, CssBaseline, Divider, Grid, Link, OutlinedInput, Typography } from "@mui/material";
import { deepPurple, grey, indigo, purple } from "@mui/material/colors";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import { FormGenerator } from "../../components/FormGenerator";
import { GENERATOR_INPUT_TYPE } from "../../types";

type LoginForm = {
  login: string
  password: string
}

export const Login = () => {
  const methods = useForm<LoginForm>()
  const navigate = useNavigate()
  const { handleSubmit } = methods

  const handleSignIn = (data: LoginForm) => {
    console.log(data);
    navigate('/empty')
  }

  return <Box component={'main'} sx={{ bgcolor: indigo[50], p: 0, maxWidth: '100%' }}>
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
      <Box sx={{
        maxWidth: { xs: 400, lg: 475 }, bgcolor: "white", borderRadius: 3, p: 5
      }}>
        <Grid container flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Grid item mb={2}>
            <Typography fontWeight={600}>L O G O</Typography>
          </Grid>
          <Grid>
            <Grid item container alignItems={'center'} flexDirection={'column'} mb={4}>
              <Grid item>
                <Typography fontWeight={600} fontSize={24} color={deepPurple[600]}>Добро пожаловать</Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={14} color={grey[600]}>Введите свои учетные данные</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mb={3}>
            <Typography fontWeight={500} fontSize={18} color={grey[600]}>Войдите в систему</Typography>
          </Grid>
          <Grid item>
            <FormProvider {...methods}>
              <FormGenerator inputs={
                [
                  { name: 'login', inputType: GENERATOR_INPUT_TYPE.TEXTFIELD, labelOver: 'Имя пользователя', type: 'email', size: 'medium', rules: { required: 'Не указано имя пользователя' } },
                  { name: 'password', inputType: GENERATOR_INPUT_TYPE.TEXTFIELD, labelOver: 'Пароль', type: 'password', size: 'medium', rules: { required: 'Пароль не указан' } }
                ]
              }
              />
            </FormProvider>
            <Grid item mt={3} mb={3}>
              <Button onClick={handleSubmit(handleSignIn)} variant="contained" sx={{ bgcolor: deepPurple[600], fontWeight: 600, py: 1 }} fullWidth>Войти</Button>
            </Grid>
            <Divider />
          </Grid>
          <Grid item mt={1}>
            <Typography fontSize={14} fontWeight={600} component={'a'} sx={{ cursor: 'pointer' }}>Регистрация</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>;
};


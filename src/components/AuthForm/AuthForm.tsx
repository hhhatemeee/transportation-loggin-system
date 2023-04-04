import { FC, ReactNode } from 'react'
import { blue, grey } from '@mui/material/colors'
import { Grid, Typography, Divider, Box } from '@mui/material'
import { t } from 'i18next'

import { LoadingButton } from '../LoadingButton'

type AuthFormProps = {
  children: ReactNode
  onSubmit: () => void
  submitLoading?: boolean
  onFooterText: () => void
  formText: string
  footerText: string
}

export const AuthForm: FC<AuthFormProps> = ({
  children,
  onSubmit,
  submitLoading,
  footerText,
  onFooterText,
  formText,
}) => {
  return (
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
        <Grid item container alignItems={'center'} flexDirection={'column'} mb={4}>
          <Grid item>
            <Typography fontWeight={600} fontSize={24} color={blue[600]}>
              {t('loginPage.welcome')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={14} color={grey[600]}>
              {t('loginPage.subTitle')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item mb={3}>
          <Typography fontWeight={500} fontSize={18} color={grey[600]}>
            {formText}
          </Typography>
        </Grid>
        <Grid item>{children}</Grid>
        <Grid container item mt={3} mb={3}>
          <LoadingButton
            onClick={onSubmit}
            variant='contained'
            disabled={submitLoading}
            sx={{ fontWeight: 600, py: 1 }}
            loading={submitLoading}
            fullWidth
          >
            {t('loginPage.singInBtn')}
          </LoadingButton>
        </Grid>
        <Divider />
        <Grid item mt={1}>
          <Typography
            fontSize={14}
            fontWeight={600}
            component={'a'}
            onClick={onFooterText}
            sx={{ cursor: 'pointer' }}
          >
            {footerText}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

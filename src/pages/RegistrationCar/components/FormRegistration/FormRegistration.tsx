import { Box, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material'
import { FC, ReactNode, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../../../components/PageTitle'
import { TabPanel } from '../../../../components/Tabs'

type FormRegistrationProps = {
  stateNumberTab: ReactNode
  STSTab: ReactNode
}

export const FormRegistration: FC<FormRegistrationProps> = ({ STSTab, stateNumberTab }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_e: SyntheticEvent, value: number) => {
    setCurrentTab(value)
  }

  const { t } = useTranslation()
  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('registrationCarPage.title')} />
      <Grid item>
        <Card variant='outlined'>
          <CardContent>
            <Typography textAlign={'center'} variant='subtitle1'>
              {t('registrationCarPage.form.title')}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
              <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab
                  label={t('registrationCarPage.form.stateNumber.label')}
                  sx={{ maxWidth: '100%', flex: 1 }}
                />
                <Tab
                  label={t('registrationCarPage.form.STS.label')}
                  sx={{ maxWidth: '100%', flex: 1 }}
                />
              </Tabs>
            </Box>
            <TabPanel index={0} value={currentTab} contentSx={{ pb: 0 }}>
              {stateNumberTab}
            </TabPanel>
            <TabPanel index={1} value={currentTab} contentSx={{ pb: 0 }}>
              {STSTab}
            </TabPanel>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

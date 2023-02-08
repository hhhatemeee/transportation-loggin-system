import { Box, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../../../components/PageTitle'
import { TabPanel } from '../../../../components/Tabs'
import { StateNumberForm, STSForm } from '../../../../types'
import { StateNumber } from '../StateNumber'
import { STS } from '../STS'

type FormRegistrationProps = {
  onSubmitNubmerState: (data: StateNumberForm) => void
  onSubmitSTS: (data: STSForm) => void
  submitBtnText: string
}

export const FormRegistration: FC<FormRegistrationProps> = ({
  onSubmitSTS,
  onSubmitNubmerState,
  submitBtnText,
}) => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_e: SyntheticEvent, value: number) => {
    setCurrentTab(value)
  }

  const { t } = useTranslation()
  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('registrationPage.title')} />
      <Grid item>
        <Card variant='outlined'>
          <CardContent>
            <Typography textAlign={'center'} variant='subtitle1'>
              {t('registrationPage.form.title')}
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
              <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab
                  label={t('registrationPage.form.stateNumber.label')}
                  sx={{ maxWidth: '100%', flex: 1 }}
                />
                <Tab
                  label={t('registrationPage.form.STS.label')}
                  sx={{ maxWidth: '100%', flex: 1 }}
                />
              </Tabs>
            </Box>
            <TabPanel index={0} value={currentTab} contentSx={{ pb: 0 }}>
              <StateNumber onSubmit={onSubmitNubmerState} submitBtnText={submitBtnText} />
            </TabPanel>
            <TabPanel index={1} value={currentTab} contentSx={{ pb: 0 }}>
              <STS onSubmit={onSubmitSTS} submitBtnText={submitBtnText} />
            </TabPanel>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

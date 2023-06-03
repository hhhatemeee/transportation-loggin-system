import { Box, Card, CardContent, Grid, Tab, Tabs } from '@mui/material'
import { FC, ReactNode, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PageTitle } from '../../../../components/PageTitle'
import { TabPanel } from '../../../../components/Tabs'

type FormRegistrationProps = {
  stateNumberTab: ReactNode
}

export const FormRegistration: FC<FormRegistrationProps> = ({ stateNumberTab }) => {
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={2}>
              <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab
                  label={t('registrationCarPage.form.title')}
                  sx={{ maxWidth: '100%', flex: 1 }}
                />
              </Tabs>
            </Box>
            <TabPanel index={0} value={currentTab} contentSx={{ pb: 0 }}>
              {stateNumberTab}
            </TabPanel>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

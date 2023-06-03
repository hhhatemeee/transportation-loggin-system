import { useState, ChangeEvent, FC, useContext } from 'react'
import { Grid, IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'

import { TextField } from '../../../../components/TextField'
import { DataGrid } from '../../../../components/DataGrid'
import { JOURNAL_STATUS, ORDER_COLUMNS } from '../../../../constants'
import {
  RegistrationDepartureContext,
  RegistrationDepartureContextType,
} from '../../../RegistrationDeparture'

type SearchOrderProps = {
  label: string
  onSearch: (data: string) => void
  onAdd: (data: string) => void
}

export const SearchOrder: FC<SearchOrderProps> = ({ label, onAdd, onSearch }) => {
  const [value, setValue] = useState('')
  const { journalsData, loadingJournals, onUpdateJournalStatus } =
    useContext<RegistrationDepartureContextType>(RegistrationDepartureContext)

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    onSearch(value)
    setValue(value)
  }

  return (
    <Grid container spacing={2} flexDirection={'column'}>
      <Grid item flex={1}>
        <TextField
          fullWidth
          value={value}
          onChange={handleChange}
          label={label}
          InputProps={{
            endAdornment: (
              <>
                <IconButton size='medium' onClick={() => onAdd(value)}>
                  <Add fontSize={'medium'} />
                </IconButton>
              </>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <DataGrid
          columns={ORDER_COLUMNS({
            onCancel: id => onUpdateJournalStatus(id, JOURNAL_STATUS.CANCEL),
            onComplete: id => onUpdateJournalStatus(id, JOURNAL_STATUS.COMPLETE),
          })}
          rows={journalsData}
          loading={loadingJournals}
        />
      </Grid>
    </Grid>
  )
}

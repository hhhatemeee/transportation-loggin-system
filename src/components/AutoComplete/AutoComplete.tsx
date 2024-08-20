import { FC } from 'react'

import {
  Autocomplete as MUIAutoComplete,
  AutocompleteProps as MUIAutoCompleteProps,
} from '@mui/material'

export type AutocompleteOption =
  | {
      id: string
      label: string
    }
  | {
      id: number
      label: string
    }

export type AutoCompleteProps<T> = {
  options: AutocompleteOption[]
  onChange?: (details: any) => void
} & Omit<MUIAutoCompleteProps<T, boolean, boolean, boolean | undefined>, 'onChange'>

export const AutoComplete: FC<AutoCompleteProps<AutocompleteOption>> = ({
  options,
  onChange,
  ...props
}) => {
  return (
    <MUIAutoComplete
      {...props}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )
      }}
      options={options}
      onChange={(_event, details) => onChange?.(details)}
    />
  )
}

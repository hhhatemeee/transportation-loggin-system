import { REGEX } from '../../../constants'
import { DictionaryContractsForm } from '../../../types'

export const getCountConfiguredServicesInForm = (values: DictionaryContractsForm) => {
  let count = 0

  for (const key in values) {
    const value = values[key as keyof DictionaryContractsForm]

    if (REGEX.services.test(key) && Number(value)) {
      count++
    }
  }
  return count
}

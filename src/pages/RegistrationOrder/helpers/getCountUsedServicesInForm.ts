import { REGEX } from '../../../constants'
import { RegistrationOrderForm } from '../../../types'

export const getCountUsedServicesInForm = (values: RegistrationOrderForm) => {
  let count = 0

  for (const key in values) {
    const value = values[key as keyof RegistrationOrderForm]

    if (REGEX.services.test(key) && value) {
      count += Number(value)
    }
  }
  return count
}

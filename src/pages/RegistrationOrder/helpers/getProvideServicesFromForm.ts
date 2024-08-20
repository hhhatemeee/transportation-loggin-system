import { REGEX } from '../../../constants'
import { RegistrationOrderForm, POSTProvideServiceType } from '../../../types'

export const getProvideServicesFromForm = (
  values: RegistrationOrderForm
): POSTProvideServiceType[] => {
  const result = []

  for (const key in values) {
    const value = values[key as keyof RegistrationOrderForm]
    if (REGEX.services.test(key) && value) {
      result.push({
        serviceId: Number(key.split('_')[1]),
        count: Number(value),
      })
    }
  }
  return result
}

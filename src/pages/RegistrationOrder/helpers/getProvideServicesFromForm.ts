import { REGEX } from '../../../constants'
import { RegistrationOrderForm, ProvideServiceType } from '../../../types'

export const getProvideServicesFromForm = (values: RegistrationOrderForm): ProvideServiceType[] => {
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

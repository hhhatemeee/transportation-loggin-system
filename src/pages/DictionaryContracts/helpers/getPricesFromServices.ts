import { REGEX } from '../../../constants'

export const getPricesFromServices = (values: Record<string, string>) => {
  const result = []

  for (const key in values) {
    const value = values[key]
    if (REGEX.services.test(key) && value) {
      result.push({
        serviceId: Number(key.split('_')[1]),
        cost: Number(value),
      })
    }
  }
  return result
}

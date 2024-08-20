import { GETServiceType } from '../types'

export const convertArrayServicesToDefaultValues = (services: GETServiceType[]) => {
  return Object.fromEntries(services.map(({ id }) => [`service//_${id}`, '0']))
}

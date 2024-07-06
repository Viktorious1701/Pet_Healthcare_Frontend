import { handleError } from '@/Helpers/ErrorHandler'
import axiosInstance from '@/Helpers/axiosInstance'

const api = 'https://pethealthcaresystem.azurewebsites.net/api/petVaccination'

export const petVaccinationGetAPI = async () => {
  try {
    const data = axiosInstance.get(api)
    return data
  } catch (error) {
    handleError(error)
  }
}

import { handleError } from '@/Helpers/ErrorHandler'
import axiosInstance from '@/Helpers/axiosInstance'
import { ServiceGet } from '@/Models/Service'

const api = 'https://pethealthcaresystem.azurewebsites.net/api/service'

export const serviceGetAPI = async () => {
  try {
    const data = await axiosInstance.get<ServiceGet[]>(api)
    return data
  } catch (error) {
    handleError(error)
  }
}
export const serviceGetByIdAPI = async (id: number) => {
  try {
    const data = await axiosInstance.get<ServiceGet>(`${api}/${id}`)
    return data
  } catch (error) {
    handleError(error)
  }
}

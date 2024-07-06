/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = async (error: any) => {
  if (isAxiosError(error)) {
    var err = error.response
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast('Error', {
          description: val.description
        })
      }
    } else if (typeof err?.data.errors === 'object') {
      for (let e in err?.data.errors) {
        toast('Error', {
          description: err.data.errors[e][0]
        })
      }
    } else if (err?.data) {
      toast('Error', {
        description: err.data
      })
    } else if (err) {
      toast.warning(err?.data)
    }
  }
}

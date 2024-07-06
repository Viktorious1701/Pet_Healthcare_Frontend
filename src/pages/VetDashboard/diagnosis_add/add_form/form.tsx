import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { appointmentPostAPI } from '@/Services/AppointmentService'

const AppointmentForm = () => {
  // Extract appointmentId from URL
  const { appointmentId: urlAppointmentId } = useParams<{
    appointmentId: string
  }>()

  // Initialize form state with the appointmentId from the URL
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentId: parseInt(urlAppointmentId || '', 10) || 0, // Provide a fallback empty string
    diagnosis: '',
    treatment: '',
    medication: ''
  })

  // If the URL appointmentId changes, update the form state
  useEffect(() => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      appointmentId: parseInt(urlAppointmentId || '', 10) || 0 // Provide a fallback empty string
    }))
  }, [urlAppointmentId])

  const handleInputChange = (e: { target: { id: unknown; value: unknown } }) => {
    const { id, value } = e.target // Use `id` to identify the input, assuming each input has a unique id corresponding to its state property
    setAppointmentDetails((prevState) => ({
      ...prevState,
      [String(id)]: value // Convert `id` to a string before using it as a computed property name
    }))
  }

  const handleAddAppointment = async () => {
    if (!appointmentDetails.diagnosis || !appointmentDetails.treatment || !appointmentDetails.medication) {
      alert('Please fill in all fields')
      return
    }
    const result = await appointmentPostAPI(appointmentDetails)
    if (result) {
      alert('Appointment added successfully')
      // Reset form or handle success scenario
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-full p-10 bg-opacity-20 z-10 overflow-auto'>
      <Card>
        <CardHeader className='space-y-1'>
          <div className='flex justify-between items-center mb-6'>
            <CardTitle className='text-4xl font-bold'>Add Appointment Details</CardTitle>
            <Link
              to='/vet/appointment-details'
              className='bg-[#DB2777] hover:bg-[#F3AFCF] text-white text-lg font-semibold py-2 px-10 rounded transition duration-300 ease-in-out'
            >
              Back
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='appointmentId' className='block text-xl font-normal'>
                Appointment ID
              </Label>
              <Input
                id='appointmentId'
                type='text'
                readOnly
                value={appointmentDetails.appointmentId.toString()}
                onChange={handleInputChange}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='diagnosis' className='block text-xl font-normal'>
                Diagnosis
              </Label>
              <Input
                id='diagnosis'
                type='text'
                value={appointmentDetails.diagnosis}
                onChange={handleInputChange}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='treatment' className='block text-xl font-normal'>
                Treatment
              </Label>
              <Input
                id='treatment'
                type='text'
                value={appointmentDetails.treatment}
                onChange={handleInputChange}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='medication' className='block text-xl font-normal'>
                Medication
              </Label>
              <Input
                id='medication'
                type='text'
                value={appointmentDetails.medication}
                onChange={handleInputChange}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <Button
              onClick={handleAddAppointment}
              className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'
            >
              Add Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default AppointmentForm

/* eslint-disable react-hooks/rules-of-hooks */
import { idAppointmentDetailGetAPI } from '@/Services/AppointmentDetailService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const AppointmentForm = () => {
  // Extract appointmentId from URL
  const { appointmentId: urlAppointmentId } = useParams<{
    appointmentId: string
  }>()
  // Additional state variables for appointment details
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentId: parseInt(urlAppointmentId || '', 10) || 0, // Provide a fallback empty string
    diagnosis: '',
    treatment: '',
    medication: ''
  })

  interface AppointmentDetail {
    appointmentId: number;
    diagnosis: string;
    treatment: string;
    medication: string;
  }

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      const response = await idAppointmentDetailGetAPI(parseInt(urlAppointmentId ?? '0', 10));
      console.log(response);
      if (response) {
        // Use type assertion here
        const detail = response as unknown as AppointmentDetail;
        setAppointmentDetails({
          appointmentId: detail.appointmentId,
          diagnosis: detail.diagnosis,
          treatment: detail.treatment,
          medication: detail.medication
        });
      }
    };
    fetchAppointmentDetails();
  }, []);

  // useEffect(() => {
  //   const fetchAppointmentDetails = async () => {
  //     try {
  //       const response = await appointmentGetVetIdAPI() // Fetch the vet details
  //       console.log(response)
  //         if (response) {
  //           console.log(response)
  //           // Update your form state with these details
  //           const appointmentDetails = response.map(detail => ({
  //             appointmentId: detail.appointmentId,
  //             diagnosis: detail.diagnosis,
  //             treatment: detail.treatment,
  //             medication: detail.medication
  //           }));
            
  //           setAppointmentDetails(appointmentDetails);
  //         } else {
  //           console.log('No matching appointment found')
  //         }
  //     } catch (error) {
  //       console.error('Failed to fetch appointment details:', error)
  //     }
  //   }

  //   fetchAppointmentDetails()
  // }, [urlAppointmentId]) // Dependency array updated to re-fetch if appointmentId changes

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
                value={appointmentDetails.diagnosis.toString()}
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
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default AppointmentForm

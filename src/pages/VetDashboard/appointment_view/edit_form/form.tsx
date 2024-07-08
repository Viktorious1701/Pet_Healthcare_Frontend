/* eslint-disable react-hooks/rules-of-hooks */
import { appointmentGetVetIdAPI, appointmentVetAPI } from '@/Services/AppointmentService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const AppointmentForm = () => {
  // State to hold the matching appointment
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<{
    appointmentId: string;
  } | null>(null);
  // Additional state variables for appointment details
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentId: 0,
    cancellationDate: '',
    comments: '',
    customer: '',
    date: '',
    paymentStatus: 0,
    pet: '',
    rating: 0,
    refundAmount: 0,
    service: '',
    slotEndTime: 0,
    slotStartTime: 0,
    status: '',
    totalCost: 0
  });

  const { appointmentId: urlAppointmentId } = useParams<{
    appointmentId: string;
  }>(); // Extract appointmentId from URL

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await appointmentGetVetIdAPI(); // Fetch the vet details
        console.log(response);
        const vetId = (response as unknown as { userId: string }).userId; // Type assertion
        const fetchedDetails = await appointmentVetAPI(vetId); // Fetch appointments
        console.log(fetchedDetails);
        if (fetchedDetails && fetchedDetails.length > 0) {
          // Find the appointment that matches the ID from the URL
          const matchingAppointment = fetchedDetails.find(
            (appointment) => appointment.appointmentId.toString() === urlAppointmentId
          );

          if (matchingAppointment) {
            console.log(matchingAppointment.appointmentId); // Do something with the matching appointment
            console.log(matchingAppointment);
            // Update your form state with these details
            setAppointmentDetails({
              appointmentId: matchingAppointment.appointmentId,
              cancellationDate: matchingAppointment.cancellationDate,
              comments: matchingAppointment.comment,
              customer: matchingAppointment.customer,
              date: matchingAppointment.date,
              paymentStatus: matchingAppointment.paymentStatus,
              pet: matchingAppointment.pet,
              rating: matchingAppointment.rating,
              refundAmount: matchingAppointment.refundAmount,
              service: matchingAppointment.service,
              slotEndTime: matchingAppointment.slotEndTime,
              slotStartTime: matchingAppointment.slotStartTime,
              status: matchingAppointment.status,
              totalCost: matchingAppointment.totalCost
            });
          } else {
            console.log('No matching appointment found');
          }
        } else {
          // Handle the case where details is undefined
          console.error('Appointment details are undefined');
        }
      } catch (error) {
        console.error('Failed to fetch appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [urlAppointmentId]); // Dependency array updated to re-fetch if appointmentId changes

  return (
    <form className='w-full p-10 bg-opacity-20 z-10 overflow-auto'>
      <Card>
        <CardHeader className='space-y-1'>
          <div className='flex justify-between items-center mb-6'>
            <CardTitle className='text-4xl font-bold'>View Appointment</CardTitle>
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
                value={appointmentDetails.appointmentId ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='customer' className='block text-xl font-normal'>
                Customer
              </Label>
              <Input
                id='customer'
                type='text'
                readOnly
                value={appointmentDetails.customer ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-1/2 px-3 mb-6'>
              <Label htmlFor='date' className='block text-xl font-normal'>
                Date
              </Label>
              <Input
                id='date'
                type='date'
                readOnly
                value={appointmentDetails.date ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-1/2 px-3 mb-6'>
              <Label htmlFor='cancellationDate' className='block text-xl font-normal'>
                Cancellation Date
              </Label>
              <Input
                id='cancellationDate'
                type='date'
                readOnly
                value={appointmentDetails.cancellationDate ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='comments' className='block text-xl font-normal'>
                Comments
              </Label>
              <Input
                id='comments'
                type='text'
                value={appointmentDetails.comments}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    comments: e.target.value
                  })
                }
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>

            <div className='w-full px-3 mb-6'>
              <Label htmlFor='paymentStatus' className='block text-xl font-normal'>
                Payment Status
              </Label>
              <Input
                id='paymentStatus'
                type='number'
                value={appointmentDetails.paymentStatus}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    paymentStatus: Number(e.target.value)
                  })
                }
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='pet' className='block text-xl font-normal'>
                Pet
              </Label>
              <Input
                id='pet'
                type='text'
                readOnly
                value={appointmentDetails.pet ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            {/* <div className="w-full px-3 mb-6">
      <Label htmlFor="rating" className="block text-xl font-normal">Rating</Label>
      <Input id="rating" type="number" min="0" max="5" step="0.1" className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg" />
    </div>
    <div className="w-full px-3 mb-6">
      <Label htmlFor="refundAmount" className="block text-xl font-normal">Refund Amount</Label>
      <Input id="refundAmount" type="number" step="0.01" className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg" />
    </div> */}
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='service' className='block text-xl font-normal'>
                Service
              </Label>
              <Input
                id='service'
                type='text'
                value={appointmentDetails.service ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-1/2 px-3 mb-6'>
              <Label htmlFor='slotStartTime' className='block text-xl font-normal'>
                Slot Start Time
              </Label>
              <Input
                id='slotStartTime'
                type='time'
                readOnly
                value={appointmentDetails.slotStartTime ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-1/2 px-3 mb-6'>
              <Label htmlFor='slotEndTime' className='block text-xl font-normal'>
                Slot End Time
              </Label>
              <Input
                id='slotEndTime'
                type='time'
                readOnly
                value={appointmentDetails.slotEndTime ?? ''}
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='status' className='block text-xl font-normal'>
                Status
              </Label>
              <Input
                id='status'
                type='text'
                value={appointmentDetails.status}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    status: e.target.value
                  })
                }
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <Label htmlFor='totalCost' className='block text-xl font-normal'>
                Total Cost
              </Label>
              <Input
                id='totalCost'
                type='number'
                step='1'
                value={appointmentDetails.totalCost}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    totalCost: e.target.valueAsNumber // Use valueAsNumber for type="number"
                  })
                }
                className='w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AppointmentForm;

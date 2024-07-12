import { AppointmentGet } from '@/Models/Appointment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AppointmentListProps {
  appointments: AppointmentGet[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const getBorderColor = (status: string) => {
    switch (status) {
      case 'Boooked':
        return 'border-b-gray-500 border-b-4';
      case 'Processing':
        return 'border-b-blue-500 border-b-4';
      case 'Done':
        return 'border-b-success-500 border-b-4';
      case 'Cancelled':
        return 'border-b-danger-500 border-b-4';
    }
  };
  const getPaymentState = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
        case 1:
        return "Paid";
        case 2:
        return "Refund";
        case 3:
        return "Failed";
    }
  }
  return (
    <div className='grid grid-cols-5 gap-2'>
      {appointments.map((appointment) => (
        <Card className={getBorderColor(appointment.status)} key={appointment.appointmentId}>
          <CardHeader>
            <CardTitle>
              {appointment.customer} with {appointment.pet}
            </CardTitle>
            <CardDescription>Appointment: {appointment.appointmentId}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-5'>
            <div className='col-span-2 space-y-1'>
              <p className='text-sm font-medium leading-none'>Date: {appointment.date}</p>
              <p className='text-sm text-muted-foreground'>
                Payment:{' '}
                {getPaymentState(appointment.paymentStatus)}
              </p>
            </div>
            <div className='col-span-3 space-y-1 text-right'>
              <p className='text-sm font-medium leading-none'>Service</p>
              <p className='text-sm text-muted-foreground'>{appointment.service}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-sm font-medium leading-none'>Cancellation Date: {appointment.cancellationDate}</p>
              <p className='text-sm text-muted-foreground'>Refund amount: ${appointment.refundAmount}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-md font-medium leading-none'>
                From: {appointment.slotStartTime} To: {appointment.slotEndTime}
              </p>
              <p className='text-lg text-muted-foreground'>Total Cost: ${appointment.totalCost}</p>
            </div>
          </CardContent>
          <CardFooter className='grid grid-cols-5'>
            <div className='space-y-1 col-span-5'>
              <p className='text-sm font-medium leading-none'>Rating for vet: {appointment.rating}</p>
              <p className='text-sm text-muted-foreground'>Customer comment: {appointment.comment}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-lg font-medium leading-none'>Veterinarian: {appointment.vet}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentList;

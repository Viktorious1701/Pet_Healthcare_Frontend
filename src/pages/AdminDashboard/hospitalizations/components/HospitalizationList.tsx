import { Hospitalization } from '@/Models/Hospitalization';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface HospitalizationListProps {
  hospitalization: Hospitalization[];
}

const HospitalizationList: React.FC<HospitalizationListProps> = ({ hospitalization }) => {
  const getBorderColor = (status: number) => {
    switch (status) {
      case 1:
        return 'border-b-success-500 border-b-4';
      default:
        return 'border-b-blue-500 border-b-4';
    }
  };
  return (
    <div className='grid grid-cols-5 gap-2'>
      {hospitalization.map((hospital) => (
        <Card className={getBorderColor(hospital.paymentStatus)} key={hospital.hospitalizationId}>
          <CardHeader>
            <CardTitle>
              {hospital.petName} - {hospital.vetName}
            </CardTitle>
            <CardDescription>Hospitalization: {hospital.hospitalizationId}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-5'>
            <div className='col-span-2 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                From: {hospital.admissionDate} To: {hospital.dischargeDate}
              </p>
            </div>
            <div className='col-span-3 space-y-1 text-right'>
              <p className='text-lg font-medium leading-none'>Total Cost</p>
              <p className='text-lg text-muted-foreground'>${hospital.totalCost}</p>
            </div>
          </CardContent>
          <CardFooter className='grid grid-cols-5'>
            <div className='space-y-1 col-span-5'>
              <p className='text-sm font-medium leading-none'>Kennel Description:</p>
              <p className='text-sm text-muted-foreground'>{hospital.kennelDescription}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-sm font-medium leading-none'>
                Payment: {hospital.paymentStatus == null ? 'Pending' : 'Paid'}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HospitalizationList;

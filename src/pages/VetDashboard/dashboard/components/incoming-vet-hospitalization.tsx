import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Hospitalization {
  hospitalizationId: number;
  petName: string;
  admissionDate: string;
  dischargeDate: string;
  totalCost: number;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Booked':
      return '';
    case 'Processing':
      return 'bg-blue';
    case 'Done':
      return 'bg-success';
    case 'Cancelled':
      return 'bg-danger';
    default:
      return '';
  }
};
interface Hospitalization {
  hospitalizationId: number;
  petName: string;
  admissionDate: string;
  dischargeDate: string;
  totalCost: number;
}
interface IncomingVetHospitalizationProps {
  hospitalizations: Hospitalization[];
}
const IncomingVetHospitalization: React.FC<IncomingVetHospitalizationProps> = ({ hospitalizations }) => {
  if (hospitalizations.length === 0) {
    return <div className='text-center'>No hospitalizations</div>;
  }
  const today = new Date();

  const currentHospitalizations = hospitalizations.filter((hospitalization) => {
    const admissionDate = new Date(hospitalization.admissionDate);
    const dischargeDate = new Date(hospitalization.dischargeDate);
    return today >= admissionDate && today <= dischargeDate;
  });

  return (
    <div className='space-y-2'>
      {currentHospitalizations.map((hospitalization) => (
        <div key={hospitalization.hospitalizationId} className='flex items-center'>
          <div className='dark:bg-gray-900 rounded-lg shadow-lg w-full'>
            <div className='p-3'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-50 flex justify-between'>
                Hospitalization for {hospitalization.petName}
                <span className='text-xl font-bold text-gray-900 dark:text-gray-50'>${hospitalization.totalCost}</span>
              </h3>
              <div className='flex justify-between'>
                <p className='text-gray-500 dark:text-gray-400'>Admission: {hospitalization.admissionDate}</p>
                <p className='text-gray-500 dark:text-gray-400'>Discharge: {hospitalization.dischargeDate}</p>
                <Badge variant='default' className={getStatusBadge('')}>
                  Hospitalization
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomingVetHospitalization;

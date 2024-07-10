import React from 'react';

interface AppointmentInfoProps {
  customer: string;
  pet: string;
  date: string;
  service: string;
  vet: string;
  totalCost: number;
}

const AppointmentInfoTable: React.FC<AppointmentInfoProps> = ({ customer, pet, date, service, vet, totalCost }) => {
  return (
    <div className='bg-white rounded-md shadow-md p-4 mb-4'>
      <h3 className='text-xl font-semibold mb-2 text-custom-darkBlue'>Appointment Details</h3>
      <table className='w-full'>
        <tbody>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Customer</td>
            <td className='py-2 text-right'>{customer}</td>
          </tr>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Pet</td>
            <td className='py-2 text-right'>{pet}</td>
          </tr>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Date</td>
            <td className='py-2 text-right'>{date}</td>
          </tr>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Service</td>
            <td className='py-2 text-right'>{service}</td>
          </tr>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Vet</td>
            <td className='py-2 text-right'>{vet}</td>
          </tr>
          <tr>
            <td className='py-2 text-gray-600 text-left'>Total Cost</td>
            <td className='py-2 text-right font-semibold'>{totalCost.toLocaleString()}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentInfoTable;

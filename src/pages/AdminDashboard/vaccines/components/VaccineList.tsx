import { VaccineGet } from '@/Models/Vaccine';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VaccineListProps {
  vaccines: VaccineGet[];
}

const VaccineList: React.FC<VaccineListProps> = ({ vaccines }) => {
  return (
    <div className='grid grid-cols-5 gap-2'>
      {vaccines.map((vaccine) => (
        <Card key={vaccine.vaccineId}>
          <CardHeader>
            <CardTitle>{vaccine.name}</CardTitle>
            <CardDescription>VaccineId: {vaccine.vaccineId}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-5'>
            <div className='col-span-5 space-y-1'>
              <p className='text-sm font-medium leading-none'>Description</p>
              <p className='text-sm text-muted-foreground'>{vaccine.description}</p>
            </div>
          </CardContent>
          {/* <CardFooter className='grid grid-cols-5'>
            <div className='space-y-1 col-span-5'>
              <p className='text-sm font-medium leading-none'>Capacity: {kennel.capacity}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-sm font-medium leading-none'>Availability: {kennel.isAvailable ? "Available" : "Occupied"}</p>
            </div>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};

export default VaccineList;

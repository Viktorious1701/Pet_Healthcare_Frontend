import { useAuth } from '@/Context/useAuth';
import { PetGet } from '@/Models/Pet';
import { petsOfCustomerAPI } from '@/Services/PetService';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PetRecordTable from './PetRecordTable';
import PetVaccination from './PetVaccination';

export function PetRecord() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const [pets, setPets] = useState<PetGet[]>([]);

  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      try {
        if (user?.userName) {
          const res = await petsOfCustomerAPI(String(user.userName));
          if (res?.data) {
            setPets(res.data);
          } else {
            setPets([]); // Ensure pets is an empty array if no data
          }
        }
      } catch (e) {
        toast.error('Server error occurred');
        console.error(e);
        setPets([]); // Ensure pets is an empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    getPets();
  }, [user?.userName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion type='single' collapsible className='w-full p-4 scroll-m-0'>
      <div className='bg-gray-700 flex items-center justify-between rounded-md p-2 mb-3'>
        <h1 className='text-2xl font-bold text-white'>Pet Medical Records</h1>
      </div>
      {(Array.isArray(pets) && pets.length > 0) ? (
        pets.map((pet) => (
          <AccordionItem key={pet.id} value={pet.name}>
            <AccordionTrigger>
              <Card className='flex bg-white shadow-lg w-full'>
                <CardMedia
                  sx={{ height: 100, width: 200 }}
                  image={pet.imageUrl}
                  className='rounded-l-lg'
                  component='div'
                />
                <CardContent className='mt-2'>
                  <Typography variant='h5' className='flex justify-between'>
                    {pet.name}
                  </Typography>
                  <Typography variant='body1' color='body2' align='left'>
                    {pet.species} - {pet.breed}
                  </Typography>
                </CardContent>
              </Card>
            </AccordionTrigger>
            <AccordionContent className='shadow-lg'>
              <PetVaccination petId={pet.id} />
              <PetRecordTable petId={pet.id} />
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className='text-center py-4'>
          <p>No pets found. Add a pet to see their medical records.</p>
        </div>
      )}
    </Accordion>
  );
}
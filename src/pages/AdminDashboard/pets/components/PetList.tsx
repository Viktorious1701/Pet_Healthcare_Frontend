import { PetGet } from '@/Models/Pet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CardMedia } from '@mui/material';

interface PetListProps {
  pets: PetGet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  const getBorderColor = (gender: boolean) => {
    switch (gender) {
      case true:
        return 'border-b-blue-500 border-b-4';
      case false:
        return 'border-b-custom-pink border-b-4';
    }
  };
  return (
    <div className='grid grid-cols-6 gap-6'>
      {pets.map((pet) => (
        <Card className={getBorderColor(pet.gender)} key={pet.id}>
          <CardHeader>
            <CardTitle>
              {pet.name} the {pet.species}
            </CardTitle>
            <CardDescription>Breed: {pet.breed}</CardDescription>
          </CardHeader>
          <CardMedia component='img' image={pet.imageUrl} alt='Paella dish' />
          <CardFooter className='grid grid-cols-5 mt-2'>
            <div className='col-span-3 space-y-1'>
              <p className='text-sm font-medium leading-none'>Gender:</p>
              <p className='text-sm text-muted-foreground'>{pet.gender ? 'Male' : 'Female'}</p>
            </div>
            <div className='col-span-2 space-y-1'>
              <p className='text-sm font-medium leading-none'>Weight:</p>
              <p className='text-sm text-muted-foreground'>{pet.weight}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PetList;

import { PetHealthTrack } from '@/Models/PetHealthTrack';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CardMedia, Typography } from '@mui/material';

interface PetHealthStatusProps {
  petHealthTracks: PetHealthTrack[];
}

const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return 'bg-danger';
    case 1:
      return 'bg-yellow-400';
    case 2:
      return 'bg-blue-600';
    case 3:
      return 'bg-success';
  }
};

const getHealthBadge = (status: number) => {
  switch (status) {
    case 0:
      return 'Severe';
    case 1:
      return 'Recovering';
    case 2:
      return 'Normal';
    case 3:
      return 'Good';
  }
};

const PetHealthStatus: React.FC<PetHealthStatusProps> = ({ petHealthTracks }) => {
  petHealthTracks = petHealthTracks.filter(
    (petHealthTrack) => new Date(petHealthTrack.date).getDate() == new Date().getDate()
  );

  return (
    <div className='space-y-4'>
      {petHealthTracks.map((petHealthTrack) => (
        <div key={petHealthTrack.petHealthTrackId} className='flex items-center'>
          <Card className='bg-white shadow-lg w-full'>
            <CardMedia sx={{ height: 110 }} image={petHealthTrack.petImage} className='rounded-t-lg' />
            <CardContent className='mt-2'>
              <Typography gutterBottom variant='h5' component='div' className='flex justify-between'>
                {petHealthTrack.petName}
                <Badge variant='default' className={`${getStatusBadge(petHealthTrack.status)}`}>
                  {getHealthBadge(petHealthTrack.status)}
                </Badge>
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {petHealthTrack.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default PetHealthStatus;

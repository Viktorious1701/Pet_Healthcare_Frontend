import { Kennel } from "@/Models/Kennel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface KennelListProps
{
    kennels: Kennel[];
}

const KennelList: React.FC<KennelListProps> = ({kennels}) => {
    const getBorderColor = (status: boolean) => {
        switch (status) {
          case true:
            return 'border-b-success-500 border-b-4';
          case false:
            return 'border-b-danger-500 border-b-4';
        }
      };
  return (
    <div className='grid grid-cols-5 gap-2'>
      {kennels.map((kennel) => (
        <Card className={getBorderColor(kennel.isAvailable)} key={kennel.kennelId}>
          <CardHeader>
            <CardTitle>
              Daily Cost: ${kennel.dailyCost}
            </CardTitle>
            <CardDescription>KennelId: {kennel.kennelId}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-5'>
            <div className='col-span-5 space-y-1'>
              <p className='text-sm font-medium leading-none'>Description</p>
              <p className='text-sm text-muted-foreground'>{kennel.description}</p>
            </div>
          </CardContent>
          <CardFooter className='grid grid-cols-5'>
            <div className='space-y-1 col-span-5'>
              <p className='text-sm font-medium leading-none'>Capacity: {kennel.capacity}</p>
            </div>
            <div className='col-span-5 space-y-1 mt-2'>
              <p className='text-sm font-medium leading-none'>Availability: {kennel.isAvailable ? "Available" : "Occupied"}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default KennelList
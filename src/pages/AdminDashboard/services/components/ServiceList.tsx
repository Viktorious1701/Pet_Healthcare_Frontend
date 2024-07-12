import { ServiceGet } from "@/Models/Service"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceListProps
{
    services: ServiceGet[];
}

const ServiceList: React.FC<ServiceListProps> = ({services}) => {
  return (
    <div className='grid grid-cols-5 gap-2'>
      {services.map((service) => (
        <Card key={service.serviceId}>
          <CardHeader>
            <CardTitle>
              {service.name}
            </CardTitle>
            <CardDescription>ServiceId: {service.serviceId}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-5'>
            <div className='col-span-5 space-y-1'>
              <p className='text-sm font-medium leading-none'>Description</p>
              <p className='text-sm text-muted-foreground'>{service.description}</p>
            </div>
          </CardContent>
          <CardFooter className='grid grid-cols-5'>
            <div className='space-y-1 col-span-5'>
              <p className='text-lg font-medium leading-none'>Cost: ${service.cost}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ServiceList
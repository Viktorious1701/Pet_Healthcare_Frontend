import { Link } from 'react-router-dom';
import { Button } from '@/components/custom/button';
import Paw from '@/assets/Paw2.svg';

export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <img src={Paw} alt='Logo' className='w-44 h-44' />
        <h1 className='text-[7rem] font-bold leading-tight'>503</h1>
        <span className='font-medium'>Website is under maintenance!</span>
        <p className='text-center text-muted-foreground'>
          The site is not available at the moment. <br />
          We'll be back online shortly.
        </p>
        <div className='mt-6 flex gap-4'>
          <Link to='/'>
            <Button variant='outline'>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

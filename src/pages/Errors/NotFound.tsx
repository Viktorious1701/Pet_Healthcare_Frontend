import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import Paw from '@/assets/Paw2.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <img src={Paw} alt='Logo' className='w-44 h-44' />
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Page not found.</span>
        <p className='text-center text-muted-foreground'>
          The page you are looking for might have been removed, <br />
          had its name changed, or is temporarily unavailable.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Link to={'/'}>
            <Button variant='outline'>Go to homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound

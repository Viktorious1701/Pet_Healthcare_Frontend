import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/custom/button';
import Paw from '@/assets/Paw2.svg';

const NotAuthorized = () => {
    const navigate = useNavigate();
    const redirectToHomepage = () => {
        const timer = setTimeout(() => {
        navigate('/');
        },1000)
        return () => clearTimeout(timer);
    }

    return (
        <div className='h-svh'>
            <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
                <img src={Paw} alt="Logo" className="w-44 h-44" />
                <h1 className='text-[7rem] font-bold leading-tight'>401</h1>
                <span className='font-medium'>Oops! Not Authorized.</span>
                <p className='text-center text-muted-foreground'>
                    You are not authorized to access this page.
                </p>
                <div className='mt-6 flex gap-4'>
                    <Button variant='outline' onClick={redirectToHomepage}>
                        Go to homepage
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotAuthorized;
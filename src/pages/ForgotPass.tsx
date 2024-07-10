import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';
import PetCare from '../assets/pet-basic.jpg';
import { LOGIN } from '@/Route/router-const';
import Paw from '@/assets/Paw2.svg';

type ForgotPasswordFormInputs = {
  email: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

const ForgotPassword = () => {
  const { forgotUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormInputs>({ resolver: yupResolver(validation) });

  const handleForgotPassword = (form: ForgotPasswordFormInputs) => {
    forgotUser(form.email);
  };

  return (
    <div className='grid grid-cols-5 min-h-screen'>
      <div className='col-span-2 flex items-center justify-center bg-[var(--background)]'>
        <form
          className='w-full max-w-3xl p-10 bg-opacity-20 z-10 overflow-auto'
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Card className='py-[1rem] '>
            <div className='flex items-center ml-[1.5rem] pb-[5rem]'>
              <img src={Paw} alt='Paw' className='w-20 h-30 mr-4 text-[#DB2777]' />
              <span className='text-[3.5rem] font-mont font-semibold text-[#DB2777]'>Pet88</span>
            </div>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-4xl font-bold  mb-2'>FORGOT PASSWORD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='space-y-2 mb-6'>
                  <Label htmlFor='email' className='text-xl font-normal'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    placeholder='email@example.com'
                    type='email'
                    {...register('email')}
                    autoComplete='email'
                    className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <Button className='w-full bg-[#DB2777] text-white py-4 text-lg mt-1' type='submit'>
                  Reset Password
                </Button>
                <div className='mt-auto'>
                  <div className='text-base sm:text-lg md:text-xl font-light font-mont mt-[5rem]'>
                    Back to &nbsp;
                    <Link
                      to={`/${LOGIN}`}
                      className='font-mont font-medium text-base sm:text-lg md:text-xl text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200'
                    >
                      login
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <div className='col-span-3 flex items-center justify-center bg-gray-100'>
        <img src={PetCare} alt='Pet care' className='w-full h-full object-cover' />
      </div>
    </div>
  );
};

export default ForgotPassword;

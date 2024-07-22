import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '@/../app/globals.css';
import PetCare from '../assets/petcare.png';
//import PetCare from "../assets/dogs-7808115_1280.png";
import { useAuth } from '../Context/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FORGOT_PASS, REGISTER } from '@/Route/router-const';
import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Paw from '@/assets/Paw2.svg';
import { useAuthNavigation } from '@/Context/useAuthNavigation';

type LoginFormInputs = {
  userName: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const { loginUser } = useAuth();
  const { navigateToHome, navigateToLogin } = useAuthNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await loginUser(data.userName, data.password);
    if (result != null) {
      console.log('result is not null', result);
      navigateToHome();
    } else {
      navigateToLogin();
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className='col-span-2 flex items-center justify-center bg-[var(--background)]'>
        <form
          className='w-full max-w-3xl p-10 bg-opacity-20 z-10 overflow-auto' // Added overflow-auto for scrolling
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className='py-[4rem]'>
            <div className='flex items-center -translate-y-[7rem] ml-[1.5rem] '>
              <img src={Paw} alt='Paw' className='w-20 h-30 mr-4 text-[#DB2777]' /> {/* Adjust w-32 h-32 for size */}
              <span className='text-[3.5rem] font-mont font-semibold text-[#DB2777]'>Pet88</span>
            </div>
            <CardHeader className='space-y-1'>
              <div className='flex justify-between -translate-y-[2rem] items-center'>
                <CardTitle className='text-4xl font-bold'>SIGN IN</CardTitle>
                <Link to='/' className='text-xl text-[#DB2777] font-normal hover:underline'>
                  Back to Home
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 '>
                {/* Username and Password Inputs */}
                <div className='space-y-2 -translate-y-[0.5rem]'>
                  <Label htmlFor='username' className='text-xl font-normal'>
                    Username
                  </Label>
                  <Input
                    id='username'
                    placeholder='username'
                    type='username'
                    {...register('userName')}
                    autoComplete='new-password'
                    className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                  />
                  {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-xl font-normal'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      placeholder='••••••••'
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      autoComplete='new-password'
                      className='bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                    >
                      {showPassword ? <IconEye stroke={2} /> : <IconEyeOff stroke={2} />}
                    </button>
                  </div>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <Button className='w-full bg-[#DB2777] text-white py-4 text-lg translate-y-[1.5rem]' type='submit'>
                  Login
                </Button>
                {/* Links */}
                <div className='translate-y-[7rem]'>
                  <div className=' text-base sm:text-lg md:text-xl font-light font-mont'>
                    Don't have an account? &nbsp;
                    <Link
                      to={`/${REGISTER}`}
                      className='font-mont font-medium text-base sm:text-lg md:text-xl text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200'
                    >
                      Create one.
                    </Link>
                  </div>
                  <Link
                    to={`/${FORGOT_PASS}`}
                    className='font-mont font-medium text-base sm:text-lg md:text-xl text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200'
                  >
                    I forgot my password
                  </Link>
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

export default Login;

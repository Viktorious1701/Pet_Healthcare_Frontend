import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PetCare from '../assets/Register.jpg';
import { useAuth } from '@/Context/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import Paw from '@/assets/Paw2.svg';
import { LOGIN } from '@/Route/router-const';
import { useAuthNavigation } from '@/Context/useAuthNavigation';

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email format'),
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const Register = () => {
  const { registerUser } = useAuth();
  const { navigateToRegister, navigateToLogin } = useAuthNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: RegisterFormsInputs) => {
    const result = await registerUser(form.email, form.userName, form.password, form.confirmPassword);
    if (result !== null) {
      console.log('result is not null', result);
      navigateToLogin();
    } else {
      console.log('result is null', result);
      navigateToRegister();
    }
  };

  const [showPassword, setShowPassword] = useState(false); // Added for password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className='col-span-2 flex items-center justify-center bg-[var(--background)]'>
        <form className='w-full max-w-3xl px-10 bg-opacity-20 z-10 overflow-auto' onSubmit={handleSubmit(handleLogin)}>
          <Card>
            <div className='flex items-center ml-[1.5rem]'>
              <img src={Paw} alt='Paw' className='w-20 h-30 mr-4 text-[#DB2777]' />
              <span className='text-[3.5rem] font-mont font-semibold text-[#DB2777]'>Pet88</span>
            </div>
            <CardHeader className='space-y-1'>
              <div className='flex justify-between items-center '>
                <CardTitle className='text-4xl font-bold'>REGISTER</CardTitle>
                <Link to='/' className='text-xl text-[#DB2777] font-normal hover:underline'>
                  Back to Home
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='space-y-2 '>
                  <Label htmlFor='email' className='text-xl font-normal'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    placeholder='test@example.com'
                    type='email'
                    {...register('email')}
                    className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className='space-y-2 '>
                  <Label htmlFor='username' className='text-xl font-normal'>
                    Username
                  </Label>
                  <Input
                    id='username'
                    placeholder='username'
                    type='text'
                    {...register('userName')}
                    className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                  />
                  {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div className='space-y-2 '>
                  <Label htmlFor='password' className='text-xl font-normal'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      placeholder='••••••••'
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
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
                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword' className='text-xl font-normal'>
                    Confirm Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      placeholder='••••••••'
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className='py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg'
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                    >
                      {showConfirmPassword ? <IconEye stroke={2} /> : <IconEyeOff stroke={2} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <Button className='w-full bg-[#DB2777] text-white py-4 text-lg mt-4' type='submit'>
                  Register
                </Button>
                <div className='mt-3'>
                  <div className=' text-base sm:text-lg md:text-xl font-light font-mont '>
                    Already have an account? &nbsp;
                    <Link
                      to={`/${LOGIN}`}
                      className='font-mont font-medium text-base sm:text-lg md:text-xl text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200'
                    >
                      Login
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

export default Register;

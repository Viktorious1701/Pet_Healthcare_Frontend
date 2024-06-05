
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../Context/useAuth";
import { Link } from 'react-router-dom';
import PetCare from "../assets/petcare.jpg";
import { Divider } from "@nextui-org/react";

type ForgotPasswordFormInputs = {
  email: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const { forgotUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({ resolver: yupResolver(validation) });

  const handleForgotPassword = (form: ForgotPasswordFormInputs) => {
    forgotUser(form.email);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <img
        src={PetCare}
        alt="Pet care"
        className="absolute w-full h-full object-cover"
      />
      <form
        className="w-full max-w-md p-8 bg-white bg-opacity-20 rounded shadow-md z-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                />
                {errors.email ? <p>{errors.email.message}</p> : ""}
              </div>
              <div className="flex justify-between">
                <Link 
                    to="/login" 
                    className="flex-1 mr-2 px-4 py-2 text-sm font-bold text-white bg-[#DB2777] rounded hover:bg-[#9B1B5A] transition-colors duration-200 inline-flex items-center justify-center"
                >
                    Go Back to Login
                </Link>
                <Button className="flex-1" type="submit">
                    Reset Password
                </Button>
                </div>
              <div className="flex justify-center pt-2 w-[90%] mx-auto">
                <Divider className="w-full"/>
              </div>
              <div className="flex flex-col items-center mt-4 text-[1rem]">
                <p>
                    Don't have an account?{' '}
                </p>
                <Link 
                    to="/register" 
                    className="text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200 mt-3 text-[1.2rem]"
                >
                    Create Account
                </Link>
                </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ForgotPassword;
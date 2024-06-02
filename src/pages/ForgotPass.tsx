import React from "react";
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

type ForgotPasswordFormInputs = {
  email: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({ resolver: yupResolver(validation) });

  const handleForgotPassword = (form: ForgotPasswordFormInputs) => {
    resetPassword(form.email);
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
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-sm text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
                >
                  Back to Login
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
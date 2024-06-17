import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/../app/globals.css";
import PetCare from "../assets/petcare.jpg";
import { useAuth } from "@/Context/useAuth";
import { useForm } from "react-hook-form";
import { Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[--background]">
      <img
        src={PetCare}
        alt="Pet care"
        className="absolute w-full h-full object-cover"
      />
      <form
        className="w-full max-w-md p-8 bg-opacity-20 rounded shadow-md z-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-50"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="test@example.com"
                  required
                  type="email"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-white">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  required
                  type="text"
                  placeholder="username"
                  {...register("userName")}
                />
                {errors.userName ? (
                  <p className="text-white">{errors.userName.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-white">{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>
              <Button className="w-full" type="submit">
                Register
              </Button>
              <div className="flex justify-center pt-2 w-[90%] mx-auto">
                <Divider className="w-full"/>
              </div>
              <div className="text-center">
                <p>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Register;

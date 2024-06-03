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
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
import React from "react";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };

  const [isSelected] = React.useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <img
        src={PetCare}
        alt="Pet care"
        className="absolute w-full h-full object-cover"
      />
      <form
        className="w-full max-w-md p-8 bg-white bg-opacity-20 rounded shadow-md z-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  type="username"
                  {...register("userName")}
                  autoComplete="new-password"
                />
                {errors.userName ? <p>{errors.userName.message}</p> : ""}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              <div className="flex justify-between">
                <Checkbox defaultSelected={isSelected} size="sm">
                  Remember me
                </Checkbox>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
              <div className="text-center">
                Don't have an account? &nbsp;
                <Link
                  to="/register"
                  className="font-bold text-sm text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;

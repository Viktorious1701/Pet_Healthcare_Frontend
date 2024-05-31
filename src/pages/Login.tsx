

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
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <img
        src={PetCare}
        alt="Pet care"
        className="absolute w-full h-full object-cover"
      />
      <form
        className="w-full max-w-md p-8 bg-white rounded shadow-md z-10"
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
                <Input id="password" type="password" {...register("password")} autoComplete="new-password"/>
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;


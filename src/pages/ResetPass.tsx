import { useAuth } from "@/Context/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import PetCare from "../assets/petcare.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type ResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

interface QueryParams {
  token?: string;
  email?: string;
}

const validation = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Password confirmation is required"),
});

const ResetPass: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const { resetUser } = useAuth();

  useEffect(() => {
    // Function to parse query parameters from the URL
    const parseQueryString = (queryString: string): QueryParams => {
      const params: QueryParams = {};
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        if (key === "token" || key === "email") {
          params[key] = value;
        }
      }
      return params;
    };

    // Extract query parameters from the URL
    const queryParams = parseQueryString(location.search);

    // Update state with token and email values
    if (queryParams.token) {
      setToken(queryParams.token);
    }
    if (queryParams.email) {
      setEmail(queryParams.email);
    }
  }, [location.search]); // Trigger effect whenever the location.search changes
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({ resolver: yupResolver(validation) });

  const handleResetPassword = (form: ResetPasswordFormInputs) => {
    resetUser(token, email, form.password, form.confirmPassword);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <img
        src={PetCare}
        alt="Pet care"
        className="absolute w-full h-full object-cover"
      />
      <form
        className="w-full max-w-md p-8 bg-opacity-20 rounded shadow-md z-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-50"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Create a new password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register("password")}
                />
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword ? (
                  <p>{errors.confirmPassword.message}</p>
                ) : (
                  ""
                )}
              </div>
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ResetPass;

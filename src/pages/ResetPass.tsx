import { useAuth } from "@/Context/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import PetCare from "../assets/petcare.jpg";
import Paw from "../assets/Paw2.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { LOGIN } from "@/Route/router-const";
import { useAuthNavigation } from "@/Context/useAuthNavigation";

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

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { navigateToLogin } = useAuthNavigation();
  const handleResetPassword = (form: ResetPasswordFormInputs) => {
    resetUser(token, email, form.password, form.confirmPassword);
    navigateToLogin();
  };

  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="col-span-2 flex items-center justify-center bg-[var(--background)]">
        <form
          className="w-full max-w-3xl p-10 bg-opacity-20 z-10 overflow-auto" // Added overflow-auto for scrolling
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Card>
            <div className="flex items-center ml-[1.5rem]">
              <img src={Paw} alt="Paw" className="w-20 h-30 mr-4 text-[#DB2777]" />{" "}
              {/* Adjust w-32 h-32 for size */}
              <span className="text-[3.5rem] font-mont font-semibold text-[#DB2777]">Pet88</span>
            </div>
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-bold mt-6 md:mt-16 lg:mt-36 mb-6">
                RESET PASSWORD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Password and Confirm-Password Inputs */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="password" className="text-xl font-normal">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword1 ? "text" : "password"}
                    {...register("password")}
                    autoComplete="new-password"
                    className="py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword1 ? (
                        <IconEye stroke={2} />
                      ) : (
                        <IconEyeOff stroke={2} />
                      )}
                    </button>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="space-y-2 mb-6 ">
                  <Label htmlFor="confirmPassword" className="text-xl font-normal">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type={showPassword2 ? "text" : "password"}
                      {...register("confirmPassword")}
                      autoComplete="new-password"
                      className="py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword2 ? (
                        <IconEye stroke={2} />
                      ) : (
                        <IconEyeOff stroke={2} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <Button
                  className="w-full bg-[#DB2777] text-white py-4 text-lg mt-4"
                  type="submit"
                >
                  Reset
                </Button>
                <div className="mt-auto">
                  <div className="pt-[16rem] md:pt-[4rem] lg:pt-[8rem] xl:pt-[16rem] text-base sm:text-lg md:text-xl font-light font-mont">
                  Just remember your account? &nbsp;
                    <Link
                      to={`/${LOGIN}`}
                      className="font-mont font-medium text-base sm:text-lg md:text-xl text-[#DB2777] hover:underline hover:text-[#9B1B5A] transition-colors duration-200"
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
      <div className="col-span-3 flex items-center justify-center bg-gray-100">
        <img
          src={PetCare}
          alt="Pet care"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPass;

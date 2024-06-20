import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserInfo } from "@/Models/User";
import { userAddAPI } from "@/Services/UserService";
import { toast } from "react-toastify";
import { countries } from "@/Helpers/globalVariable";

interface UserAddFormInputs {
  role: string;
  userName: string;
  password: string;
  email: string;
  rating?: number | null;
  yearsOfExperience?: number | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: boolean;
  address: string;
  country: string;
  //   imageURL?: string | null;
  isActive: boolean;
}

interface UserAddDialogProps {
  onUserAdded: (user: UserInfo) => void;
}

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  rating: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .when("role", (role: any, schema) => {
      return role === "Vet"
        ? schema.required("Rating is required for Vets").min(0).max(5)
        : schema.nullable();
    }),
  yearsOfExperience: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .when("role", (role: any, schema) => {
      return role === "Vet"
        ? schema.required("Years of experience is required for Vets").min(0)
        : schema.nullable();
    }),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .matches(/^0\d{9}$/, "Phone number must start with a zero and be 10 digits long")
    .required("Phone number is required"),
  gender: Yup.boolean().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  //   imageURL: Yup.string().url("Invalid URL format").nullable(),
  isActive: Yup.boolean().required("Active status is required"),
});

const UserAddDialog: React.FC<UserAddDialogProps> = ({ onUserAdded }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = ["Customer", "Vet", "Employee"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserAddFormInputs>({ resolver: yupResolver(validationSchema) });

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const handleUserAdd = async (user: UserAddFormInputs) => {
    await userAddAPI(
      user.role,
      user.address,
      user.country,
      user.email,
      Number(user.rating),
      Number(user.yearsOfExperience),
      user.firstName,
      user.lastName,
      user.phoneNumber,
      user.gender,
      user.userName,
      user.password,
      user.isActive
    )
    .then((res) => {
      if (res?.data) {
        console.log(res.data);
        
        onUserAdded(res.data);
        toast.success("User added successfully");
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    });
  };

  const onSubmit = (data: UserAddFormInputs) => {
    handleUserAdd(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-custom-pink text-white mt-0">
          Add a new User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg bg-white">
        <DialogHeader>
          <DialogTitle>Add a new user profile</DialogTitle>
          <DialogDescription>
            Provide info to your user profile here. Click create when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 items-center gap-2">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select {...register("role")} onValueChange={handleRoleChange}>
              <SelectTrigger className="col-span-5">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Select
              {...register("country")}
              onValueChange={(value) => setValue("country", value)}
            >
              <SelectTrigger className="col-span-5">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="col-span-6 text-right text-small text-red-600">
                {errors.role.message}
              </p>
            )}
            {errors.country && (
              <p className="col-span-6 text-right text-small text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-12 items-center gap-2">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                placeholder="username"
                className="col-span-5"
                {...register("userName")}
              />

              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="col-span-5"
                {...register("password")}
              />
              {errors.userName && (
                <p className="col-span-6 text-right text-small text-red-600">
                  {errors.userName.message}
                </p>
              )}
              {errors.password && (
                <p className="col-span-6 text-right text-small text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="••••••••"
                className="col-span-3"
                {...register("email")}
              />

              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className="col-span-3"
                {...register("firstName")}
              />

              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="col-span-3"
                {...register("lastName")}
              />
              {errors.email && (
                <p className="col-span-4 text-right text-small text-red-600">
                  {errors.email.message}
                </p>
              )}
              {errors.firstName && (
                <p className="col-span-4 text-right text-small text-red-600">
                  {errors.firstName.message}
                </p>
              )}
              {errors.lastName && (
                <p className="col-span-4 text-right text-small text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <RadioGroup
                defaultValue="true"
                className="col-span-1"
                onValueChange={(value) => setValue("gender", value === "true")}
                {...register("gender")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" />
                  <Label>Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" />
                  <Label>Female</Label>
                </div>
              </RadioGroup>
              {selectedRole === "Vet" && (
                <>
                  <Label htmlFor="rating" className="text-right">
                    Rating
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    placeholder="0-5"
                    min={1}
                    max={5}
                    className="col-span-4"
                    {...register("rating")}
                  />

                  <Label htmlFor="yearsOfExperience" className="text-right">
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    placeholder="years"
                    min={0}
                    className="col-span-4"
                    {...register("yearsOfExperience")}
                  />
                  {errors.rating && (
                    <p className="col-span-7 text-right text-small text-red-600">
                      {errors.rating.message}
                    </p>
                  )}
                  {errors.yearsOfExperience && (
                    <p className="col-span-5 text-right text-small text-red-600">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </>
              )}
              {errors.gender && (
                <p className="col-span-full text-right text-small text-red-600">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-12 items-center gap-2">
              <Label htmlFor="isActive" className="text-right">
                Is Active
              </Label>
              <RadioGroup
                defaultValue="true"
                className="col-span-2"
                onValueChange={(value) =>
                  setValue("isActive", value === "true")
                }
                {...register("isActive")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="r1" />
                  <Label htmlFor="r1">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="r2" />
                  <Label htmlFor="r2">Inactive</Label>
                </div>
              </RadioGroup>
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                placeholder="address"
                className="col-span-4"
                {...register("address")}
              />
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="(0...)"
                className="col-span-3"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="col-span-full text-right text-small text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default UserAddDialog;

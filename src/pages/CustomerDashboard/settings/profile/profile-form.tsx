import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/custom/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserInfo } from "@/Models/User";
import { getUserProfile, userAccountUpdateAPI } from "@/Services/UserService";
import { countries } from "@/Helpers/globalVariable";

const profileFormSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  userId: z.string(),
  role: z.string(),
  address: z.string(),
  country: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().refine((val) => val === "" || /^[0-9]+$/.test(val), {
    message: "Phone number must contain only digits.",
  }),
  gender: z.boolean(),
  isActive: z.boolean(),
  imageFile: z.instanceof(File).nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const [user, setUser] = useState<UserInfo>();
  const [countrySelect, setCountrySelect] = useState(user?.country);
  const [genderSelect, setGenderSelect] = useState(user?.gender);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });
  const { reset } = form;
  async function onSubmit(data: ProfileFormValues) {
    console.log(data);
    await handleUserUpdate(
      data.address,
      data.country,
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.gender,
      data.userName,
      data.isActive,
      data.imageFile
    );
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleUserUpdate = async (
    address: string,
    country: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: boolean,
    userName: string,
    isActive: boolean,
    imageFile: File | null
  ) => {
    await userAccountUpdateAPI(
      address,
      country,
      firstName,
      lastName,
      phoneNumber,
      gender,
      userName,
      isActive,
      imageFile
    )
      .then((res) => {
        if (res?.data) {
          setUser(res.data);
          toast({
            title: "User " + `${userName}` + " is updated",
          });
        }
      })
      .catch((e) => {
        toast({
          title: e,
          description: "Server error occurred",
        });
      });
  };

  const getUser = async () => {
    await getUserProfile()
      .then((res) => {
        if (res?.data) {
          setUser(res.data);
          setCountrySelect(res.data.country);
          setGenderSelect(res.data.gender);
          reset({
            userName: res.data.userName,
            email: res.data.email,
            userId: res.data.userId,
            role: res.data.role,
            address: res.data.address,
            country: res.data.country,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phoneNumber: res.data.phoneNumber ? res.data.phoneNumber : "",
            gender: res.data.gender,
            isActive: res.data.isActive,
          });
        }
      })
      .catch((e) => {
        toast({
          title: e,
          description: "Server error occurred",
        });
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormDescription>
                We don't have support for changing your email yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Phone number should follow format: (09...)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  value={countrySelect}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setCountrySelect(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Your nationality.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Is optional to provide your address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    value={genderSelect ? "true" : "false"}
                    onValueChange={(value) => {
                      field.onChange(value === "true");
                      setGenderSelect(value === "true" ? true : false);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Male</SelectItem>
                      <SelectItem value="false">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0] ?? null);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This will be display as your profile image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}

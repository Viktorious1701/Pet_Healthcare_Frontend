/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UserInfo } from '@/Models/User';
import { countries } from '@/Helpers/globalVariable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { userAddAPI } from '@/Services/UserService';

const profileFormSchema = z
  .object({
    userName: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.'
      })
      .max(30, {
        message: 'Username must not be longer than 30 characters.'
      }),
    email: z.string().email(),
    role: z.string(),
    address: z.string(),
    country: z.string(),
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters.'
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters.'
    }),
    phoneNumber: z.string().refine((val) => val === '' || /^[0-9]+$/.test(val), {
      message: 'Phone number must contain only digits.'
    }),
    gender: z.boolean(),
    password: z.string().min(2, {
      message: 'Password must be at least 2 characters.'
    }),
    isActive: z.boolean(),
    rating: z.number().min(0).max(5).optional(),
    yearsOfExperience: z.number().nonnegative().optional()
  })
  .refine(
    (data) => {
      if (data.role === 'Vet') {
        return data.rating !== undefined && data.yearsOfExperience !== undefined;
      }
      return true;
    },
    {
      message: 'Rating and Years of Experience are required for Vet role',
      path: ['rating', 'yearsOfExperience']
    }
  );

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserAddDialogProps {
  onUserAdded: (user: UserInfo) => void;
}

const UserAddDialog: React.FC<UserAddDialogProps> = ({ onUserAdded }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const roles = ['Customer', 'Vet', 'Employee'];
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      country: '',
      address: '',
      isActive: true,
      password: '' // Don't pre-fill the password for security reasons
      // imageUrl: null
    }
  });

  const handleUserAdd = async (user: ProfileFormValues) => {
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

  const handleReset = () => {
    form.reset();
  };

  function onSubmit(data: ProfileFormValues) {
    console.log(data);

    handleUserAdd(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' className='bg-custom-pink text-white mt-0'>
          Add a new User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-screen-md bg-white'>
        <DialogHeader>
          <DialogTitle>Add a new user profile</DialogTitle>
          <DialogDescription>Provide info to your user profile here. Click create when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 h-[80vh] overflow-y-auto'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>We don't have support for changing your email yet.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='userName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the user public display name. It can be a real name or a pseudonym.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormDescription>Make sure to create a secure password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedRole(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='firstName'
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
                name='lastName'
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
            {selectedRole === 'Vet' && (
              <div className='grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='rating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ratings</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={1}
                          max={5}
                          {...field}
                          onChange={(value) => field.onChange(value.target.value ? Number(value.target.value) : null)}
                        />
                      </FormControl>
                      <FormDescription>If it is a new vet account, it should be 5.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='yearsOfExperience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years Of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={1}
                          {...field}
                          onChange={(value) => field.onChange(value.target.value ? Number(value.target.value) : null)}
                        />
                      </FormControl>
                      <FormDescription>Vet's senority.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Phone number should follow format: (09...)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='overflow-y-auto'>
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' {...field} />
                  </FormControl>
                  <FormDescription>Is optional to provide your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value === 'true');
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='true'>Male</SelectItem>
                          <SelectItem value='false'>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
              {/* <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input type='file' {...field} />
                    </FormControl>
                    <FormDescription>This will be display as your profile image.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <div className='grid grid-cols-6 gap-2'>
              <Button type='submit' className='bg-custom-lightPink'>
                Create User
              </Button>
              <Button type='reset' className='bg-custom-gray' onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UserAddDialog;

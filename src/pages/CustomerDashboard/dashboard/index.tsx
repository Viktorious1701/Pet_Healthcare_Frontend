import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from '@/components/customer_components/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/vet_components/theme-switch';
import { TopNav } from '@/components/customer_components/top-nav';
import { UserNav } from '@/components/customer_components/user-nav';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { useAuth } from '@/Context/useAuth';
import IncomingAppointments from './components/incoming-appointments';
import { useEffect, useState } from 'react';
import { AppointmentGet } from '@/Models/Appointment';
import { appointmentCustomerAPI } from '@/Services/AppointmentService';
import { toast } from 'sonner';
import PetHealthStatus from './components/pet-health-status';
import { getUserPetHealthTracks } from '@/Services/PetHealthTrackService';
import { PetHealthTrack } from '@/Models/PetHealthTrack';
import { PetGet } from '@/Models/Pet';
import { petsOfCustomerAPI } from '@/Services/PetService';
import { IconCalendarClock, IconDogBowl, IconTooltip } from '@tabler/icons-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [petHealthTracks, setPetHealthTracks] = useState<PetHealthTrack[]>([]);
  const [pets, setPets] = useState<PetGet[]>([]);

  useEffect(() => {
    const getPets = async () => {
      await petsOfCustomerAPI(String(user?.userName))
        .then((res) => {
          if (res?.data === "User doesn't have any pets") {
            setPets([]);
          } else if (res?.data) {
            setPets(res.data);
          }
        })
        .catch((e) => {
          toast.error('Server error occurred', e);
        });
    };
    const getPetHealthTracks = async () => {
      await getUserPetHealthTracks()
        .then((res) => {
          if (res.data) {
            setPetHealthTracks(res.data);
          }
        })
        .catch((e) => {
          toast.error('Server error occurred', e);
        });
    };
    const getAppointments = async () => {
      await appointmentCustomerAPI(String(user?.userName))
        .then((res) => {
          if (res?.data) {
            setAppointments(res.data);
          }
        })
        .catch((e) => {
          toast.error('Server error occurred', e);
        });
    };
    getAppointments();
    getPets();
    getPetHealthTracks();
  }, [user?.userName]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Welcome, {user?.userName}</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-scroll pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Booking</CardTitle>
                  <IconCalendarClock />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{appointments.length} appointments made</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total pets</CardTitle>
                  <IconDogBowl />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{pets.length} pets</div>
                </CardContent>
              </Card>
              <Card className='col-span-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Today's pet care tip</CardTitle>
                  <IconTooltip />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Regular exercise for your dog</div>
                  <p className='text-xs text-muted-foreground'>
                    Regular exercise is crucial for maintaining your dog's physical and mental health. It helps prevent
                    obesity, improves cardiovascular health, strengthens muscles, and enhances mood and behavior.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4 h-[58vh] overflow-y-scroll'>
                <CardHeader className='sticky top-0 bg-white'>
                  <CardTitle>Track Your Pet's Health Status During Hospitalization</CardTitle>
                  <CardDescription>
                    This information is updated everyday, keep track of the latest status here.
                  </CardDescription>
                </CardHeader>
                <CardContent className='pl-2'>
                  <PetHealthStatus petHealthTracks={petHealthTracks} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3 overflow-y-scroll'>
                <CardHeader>
                  <CardTitle>Incoming Appointments</CardTitle>
                  <CardDescription>This is your appointments for incoming days.</CardDescription>
                </CardHeader>
                <CardContent>
                  <IncomingAppointments appointments={appointments} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}

const topNav = [
  {
    title: 'Overview',
    href: '',
    isActive: true
  },
  {
    title: 'Customers',
    href: '',
    isActive: false
  },
  {
    title: 'Products',
    href: '',
    isActive: false
  },
  {
    title: 'Settings',
    href: '',
    isActive: false
  }
];

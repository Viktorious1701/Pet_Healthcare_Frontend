import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from '@/components/vet_components/search';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/vet_components/theme-switch';
import { UserNav } from '@/components/vet_components/user-nav';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';

import IncomingAppointments from './components/incoming-vet-appointment';
import { useAuth } from '@/Context/useAuth';
import { AppointmentGet } from '@/Models/Appointment';
import { useEffect, useState } from 'react';
import { appointmentGetVetIdAPI, appointmentVetAPI } from '@/Services/AppointmentService';
import { hospitalizationListVetAPI } from '@/Services/HospitalizationService';
import IncomingVetHospitalization from './components/incoming-vet-hospitalization';
import { appointmentGetVetUserNameAPI as appointmentGetVetInfoAPI } from '@/Services/VetService';

interface Hospitalization {
  hospitalizationId: number;
  petName: string;
  admissionDate: string;
  dischargeDate: string;
  totalCost: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [yearsOfExp, setYearsOfExp] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vet ID from the current logged-in account
        const vetIdResponse = await appointmentGetVetIdAPI();

        // Fetch appointments for the vet ID
        if (!vetIdResponse) throw new Error('Failed to fetch vet ID');
        const appointmentsResponse = await appointmentVetAPI(vetIdResponse);
        setAppointments(appointmentsResponse || []);

        // Fetch hospitalizations for the vet ID
        const vetInfo = await appointmentGetVetInfoAPI();
        const vetName = vetInfo?.userName;
        setYearsOfExp(vetInfo?.yearsOfExperience || 0);
        const hospitalizationsResponse = await hospitalizationListVetAPI(vetName);
        setHospitalizations(hospitalizationsResponse || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAppointments([]);
        setHospitalizations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.userName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate total sales
  const totalSales =
    appointments.reduce((acc, appointment) => acc + appointment.totalCost, 0) +
    hospitalizations.reduce((acc, hospitalization) => acc + hospitalization.totalCost, 0);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <span className='flex-1 text-[2rem] font-mont font-semibold '>DASHBOARD</span>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Appointments</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{appointments.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Hospitalizations</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{hospitalizations.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${totalSales.toFixed(2)}</div>
                  <p className='text-xs text-muted-foreground'>Total cost from appointments and hospitalizations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Vet Years Of Experience</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{yearsOfExp} years</div>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Hospitalization in Progress</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <IncomingVetHospitalization hospitalizations={hospitalizations} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
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

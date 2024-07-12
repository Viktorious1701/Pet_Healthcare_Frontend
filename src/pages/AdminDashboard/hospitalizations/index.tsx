import { Button } from '@/components/custom/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from '@/components/admin_components/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/admin_components/theme-switch';
import { TopNav } from '@/components/admin_components/top-nav';
import { UserNav } from '@/components/admin_components/user-nav';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
// import { RecentSales } from './components/recent-sales'
// import { Overview } from "./components/overview";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IconCircleCheck, IconProgress } from '@tabler/icons-react';
import { hospitalizationListAPI } from '@/Services/HospitalizationService';
import { Hospitalization } from '@/Models/Hospitalization';
import HospitalizationList from './components/HospitalizationList';

export default function Dashboard() {
  const [hospitalization, setHospitalization] = useState<Hospitalization[]>([]);
  const getHospitalization = async () => {
    await hospitalizationListAPI()
      .then((res) => {
        if (res.data) {
          setHospitalization(res.data);
        }
      })
      .catch((e) => {
        toast.error('Server error occurred', e);
      });
  };
  useEffect(() => {
    getHospitalization();
  }, []);

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
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Hospitalization</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
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
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
              <Card className='border-b-blue-500 border-b-4'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Pet in care</CardTitle>
                  <IconProgress />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {
                      hospitalization.filter(
                        (hospital) => hospital.paymentStatus === 0 || hospital.paymentStatus === null
                      ).length
                    }{' '}
                    hospitalization
                  </div>
                </CardContent>
              </Card>
              <Card className='border-b-success-500 border-b-4'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Discharged</CardTitle>
                  <IconCircleCheck />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {hospitalization.filter((hospital) => hospital.paymentStatus === 1).length} hospitalization
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-4 lg:col-span-7 h-[58vh] overflow-y-auto'>
                <CardHeader className='sticky top-0 z-10 bg-white'>
                  <CardTitle>Total Hospitalization</CardTitle>
                  <CardDescription>{hospitalization.length} total hospitalization.</CardDescription>
                </CardHeader>
                <CardContent>
                  <HospitalizationList hospitalization={hospitalization}></HospitalizationList>
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

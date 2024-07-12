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
import { Kennel } from '@/Models/Kennel';
import { kennelGetAPI } from '@/Services/KennelService';
import KennelList from './components/KennelList';

export default function Dashboard() {
  const [kennels, setKennels] = useState<Kennel[]>([]);

  const getKennels = async () => {
    await kennelGetAPI()
      .then((res) => {
        if (res?.data) {
          setKennels(res.data);
        }
      })
      .catch((e) => {
        toast.error('Server error occured', e);
      });
  };

  useEffect(() => {
    getKennels()
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
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Kennels</h1>
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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-4 lg:col-span-7 h-[70vh] overflow-y-auto'>
                <CardHeader className='sticky top-0 z-10 bg-white'>
                  <CardTitle>Total Kennels</CardTitle>
                  <CardDescription>{kennels.length} total kennels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <KennelList kennels={kennels}></KennelList>
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

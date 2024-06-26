import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/admin_components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/admin_components/theme-switch'
import { TopNav } from '@/components/admin_components/top-nav'
import { UserNav } from '@/components/admin_components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
// import { RecentSales } from './components/recent-sales'
import { Overview } from './components/overview'
import { useEffect, useState } from 'react'
import { PaymentRevenueGet } from '@/Models/Payment'
import { revenueGetAPI } from '@/Services/PaymentService'
import { toast } from 'sonner'
import { IconCalendarMonth, IconCalendarWeek, IconCurrencyDollar, IconDeviceAnalytics } from '@tabler/icons-react'
import { AppointmentGet } from '@/Models/Appointment'
import { appointmentGetAPI } from '@/Services/AppointmentService'
import RecentAppointments from './components/recent-appointments'

export default function Dashboard() {
  const [revenue, setRevenue] = useState<PaymentRevenueGet>();
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);

  const getAppointments = async () => {
    await appointmentGetAPI()
    .then((res) => {
      if (res?.data) {
        setAppointments(res.data);
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    })
  }

  const getRevenue = async () => {
    await revenueGetAPI()
    .then((res) => {
      if (res.data) {
        setRevenue(res.data);
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    })
  }
  
  useEffect(() => {
    getRevenue();
    getAppointments();
  }, [])
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
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Dashboard
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
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
                  <CardTitle className='text-sm font-medium'>
                    Total Revenue
                  </CardTitle>
                  <IconCurrencyDollar/>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${revenue?.totalRevenue}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Monthly Revenue
                  </CardTitle>
                  <IconCalendarMonth/>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${revenue?.monthlyRevenue}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Weekly Revenue</CardTitle>
                  <IconCalendarWeek/>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${revenue?.weeklyRevenue}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Today's income
                  </CardTitle>
                  <IconDeviceAnalytics/>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${revenue?.dailyRevenue}</div>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3 h-[58vh] overflow-y-auto'>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAppointments appointments={appointments} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '',
    isActive: true,
  },
  {
    title: 'Customers',
    href: '',
    isActive: false,
  },
  {
    title: 'Products',
    href: '',
    isActive: false,
  },
  {
    title: 'Settings',
    href: '',
    isActive: false,
  },
]

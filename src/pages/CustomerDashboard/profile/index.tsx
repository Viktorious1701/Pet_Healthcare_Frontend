import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { Search } from '@/components/customer_components/search'
import ThemeSwitch from '@/components/vet_components/theme-switch'
import { UserNav } from '@/components/customer_components/user-nav'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import UserProfile from './UserProfile'

const Profile = () => {
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
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>User Profile</h1>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-scroll pb-2'></div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-12'>
                {/* <CardHeader className="flex flex-row justify-between">
                  
                </CardHeader> */}
                <CardContent className='px-2 h-[70vh]'>
                  <UserProfile />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

export default Profile

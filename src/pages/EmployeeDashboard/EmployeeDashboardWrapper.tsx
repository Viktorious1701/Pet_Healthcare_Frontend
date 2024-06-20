import { Outlet } from 'react-router-dom'
import { Layout, LayoutHeader, LayoutBody } from '@/components/custom/layout'
import { TopNav } from '@/components/employee_components/top-nav'
import { Search } from '@/components/employee_components/search'
import ThemeSwitch from '@/components/employee_components/theme-switch'
import { UserNav } from '@/components/employee_components/user-nav'

const topNav = [
  { title: 'Overview', href: '/employee/', isActive: true },
//   { title: 'Customers', href: '/employee/customers', isActive: false },
//   { title: 'Products', href: '/employee/products', isActive: false },
  { title: 'Settings', href: '/employee/settings', isActive: false },
]

export default function EmployeeDashboardWrapper() {
  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='space-y-4'>
        <Outlet />
      </LayoutBody>
    </Layout>
  )
}

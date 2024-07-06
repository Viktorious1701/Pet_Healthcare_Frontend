import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarComponent from './SidebarComponent'
import { HomeIcon, Calendar, Settings, Hospital } from 'lucide-react'
import { SidebarItem } from './SidebarComponent'
import {
  CUSTOMER_PET_LIST,
  CUSTOMER_DASHBOARD as CUSTOMER_PAGE,
  CUSTOMER_APPOINTMENTS,
  CUSTOMER_HOSPITALIZATION_TABLE as HOSPITALIZATION,
  SETTINGS
} from '@/Route/router-const'

const CustomerSidebar = () => {
  const [activePath, setActivePath] = useState(`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`)
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    setActivePath(path)
    navigate(path)
  }

  return (
    <SidebarComponent>
      <SidebarItem
        icon={<HomeIcon size={20} />}
        text='Pet List'
        path={`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`}
      />
      <SidebarItem
        icon={<Calendar size={20} />}
        text='Appointment Management'
        path={`/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`}
      />
      <SidebarItem
        icon={<Hospital size={20} />}
        text='Hospitalization Tracking'
        path={`/${CUSTOMER_PAGE}/${HOSPITALIZATION}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${HOSPITALIZATION}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${HOSPITALIZATION}`}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text='Account Settings'
        path={`/${CUSTOMER_PAGE}/${SETTINGS}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${SETTINGS}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${SETTINGS}`}
      />
    </SidebarComponent>
  )
}

export default CustomerSidebar

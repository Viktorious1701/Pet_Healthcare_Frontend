import { useEffect, useState } from 'react';
import {
  IconBuildingHospital,
  IconCalendarWeek,
  IconDashboard,
  IconListCheck,
  IconMedicalCross,
  IconSettings,
  IconUser
} from '@tabler/icons-react';
import { appointmentGetVetIdAPI, appointmentVetAPI } from '@/Services/AppointmentService';
import {
  APPOINTMENT_DETAILS,
  APPOINTMENT_MEDICAL_RECORD,
  COMING_SOON,
  HOSPITALIZATION_VET,
  SCHEDULE_VET,
  SETTINGS_PROFILE
} from '@/Route/router-const';

interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

interface SideLink extends NavLink {
  sub?: NavLink[];
}

const appointmentCountAPI = async (): Promise<number> => {
  try {
    const response = await appointmentGetVetIdAPI();
    const vetId: { userId?: string | undefined } = typeof response === 'string' ? { userId: response } : response || {};
    //console.log('vetId:', vetId);
    const details = await appointmentVetAPI(vetId?.userId || '');
    //console.log('details:', details?.length);
    // Adjusted to access a 'count' property if that's what the API returns
    //console.log('response.data:', response.data);
    return details?.length || 0;
  } catch (error) {
    console.error('Error fetching appointment count:', error);
    return 0;
  }
};

const useDynamicSideLinks = () => {
  const [sidelinks, setSidelinks] = useState<SideLink[]>([
    {
      title: 'Dashboard',
      href: '',
      icon: <IconDashboard size={18} />
    },
    {
      title: 'Schedule',
      href: `${SCHEDULE_VET}`,
      icon: <IconCalendarWeek size={18} />
    },
    {
      title: 'Appointment',
      href: `${APPOINTMENT_DETAILS}`,
      icon: <IconListCheck size={18} />,
      label: ''
    },
    {
      title: 'Medical Records',
      href: `${APPOINTMENT_MEDICAL_RECORD}`,
      icon: <IconMedicalCross size={18} />
    },
    {
      title: 'Hospitalization',
      href: `${HOSPITALIZATION_VET}`,
      icon: <IconBuildingHospital size={18} />
    },
    {
      title: 'Profile',
      href: `${COMING_SOON}`,
      icon: <IconUser size={18} />
    },
    {
      title: 'Settings',
      href: `${SETTINGS_PROFILE}`,
      icon: <IconSettings size={18} />
    }
  ]);

  useEffect(() => {
    const updateAppointmentCount = async () => {
      const count = await appointmentCountAPI();
      setSidelinks((sidelinks) =>
        sidelinks.map((link) => {
          if (link.title === 'Appointment') {
            return { ...link, label: count.toString() };
          }
          return link;
        })
      );
    };

    updateAppointmentCount();
  }, []);

  return sidelinks;
};

// Export the useDynamicSideLinks hook to allow external usage
// eslint-disable-next-line react-refresh/only-export-components
export { useDynamicSideLinks };
export type { SideLink };

import { EMPLOYEE_APPOINTMENT_MANAGE, EMPLOYEE_KENNELS, EMPLOYEE_HOSPITALIZED_PETS } from "@/Route/router-const";
import { IconDashboard, IconCalendarWeek, IconUser, IconHospital } from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: ``,
    icon: <IconDashboard size={18} />,
  },
  {
    title: 'Appointments',
    label: '',
    href: `/employee/${EMPLOYEE_APPOINTMENT_MANAGE}`,
    icon: <IconCalendarWeek size={18} />,
  },
  {
    title: 'Kennels Management',
    label: '',
    href: `/employee/${EMPLOYEE_KENNELS}`,
    icon: <IconUser size={18} />,
  },
  {
    title: 'Hospitalized Pets',
    label: '',
    href: `/employee/${EMPLOYEE_HOSPITALIZED_PETS}`,
    icon: <IconHospital size={18} />,
  },
];

import { EMPLOYEE_APPOINTMENT_BOOKING, EMPLOYEE_KENNELS, EMPLOYEE_HOSPITALIZED_PETS, EMPLOYEE_APPOINTMENT_MANAGE } from "@/Route/router-const";
import { IconDashboard, IconCalendarWeek, IconUser, IconHospital, IconBook } from "@tabler/icons-react";
import { DoorClosed } from "lucide-react";

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
    title: 'Bookings',
    label: '',
    href: `/employee/${EMPLOYEE_APPOINTMENT_BOOKING}`,
    icon: <IconBook size={18} />,
  },
  {
    title: 'Appointment',
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
    title: 'Hospitalization',
    label: '',
    href: `/employee/${EMPLOYEE_HOSPITALIZED_PETS}`,
    icon: <IconHospital size={18} />,
  },
  {
    title: 'Back to Home',
    label: '',
    href: `/`,
    icon: <DoorClosed size={18} />,
  },
];

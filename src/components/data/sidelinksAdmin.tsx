import { ADMIN_ACCOUNTS, ADMIN_APPOINTMENT, ADMIN_HOSPITALIZATION, ADMIN_KENNELS, ADMIN_PETS, ADMIN_SERVICES, ADMIN_VACCINES, COMING_SOON, SCHEDULE_VET, SETTINGS_PROFILE } from '@/Route/router-const';
import { IconCalendarDollar, IconCalendarWeek, IconDashboard, IconFrame, IconHospital, IconMedicalCross, IconPaw, IconSettings, IconUser, IconUsers, IconVaccine } from '@tabler/icons-react';
import { DoorClosed } from 'lucide-react';

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
    href: '',
    icon: <IconDashboard size={18} />
  },
  {
    title: 'Accounts',
    label: '',
    href: `${ADMIN_ACCOUNTS}`,
    icon: <IconUsers size={18} />
  },
  {
    title: 'Pets',
    label: '',
    href: `${ADMIN_PETS}`,
    icon: <IconPaw size={18} />
  },
  {
    title: 'Appointments',
    label: '',
    href: `${ADMIN_APPOINTMENT}`,
    icon: <IconCalendarDollar size={18} />
  },
  {
    title: 'Hospitalization',
    label: '',
    href: `${ADMIN_HOSPITALIZATION}`,
    icon: <IconHospital size={18} />
  },
  {
    title: 'Kennels',
    label: '',
    href: `${ADMIN_KENNELS}`,
    icon: <IconFrame size={18} />
  },
  {
    title: 'Services',
    label: '',
    href: `${ADMIN_SERVICES}`,
    icon: <IconMedicalCross size={18} />
  },
  {
    title: 'Vaccines',
    label: '',
    href: `${ADMIN_VACCINES}`,
    icon: <IconVaccine size={18} />
  },
  {
    title: 'Schedule',
    label: '',
    href: `${SCHEDULE_VET}`,
    icon: <IconCalendarWeek size={18} />
  },
  {
    title: 'Profile',
    label: '',
    href: `${COMING_SOON}`,
    icon: <IconUser size={18} />
  },
  {
    title: 'Setting',
    label: '',
    href: `${SETTINGS_PROFILE}`,
    icon: <IconSettings size={18} />
  },
  {
    title: 'Back to Home',
    label: '',
    href: `/`,
    icon: <DoorClosed size={18} />
  }
  // {
  //   title: 'Dashboard',
  //   label: '',
  //   href: '/',
  //   icon: <IconLayoutDashboard size={18} />,
  // },
  // {
  //   title: 'Tasks',
  //   label: '3',
  //   href: '/tasks',
  //   icon: <IconChecklist size={18} />,
  // },
  // {
  //   title: 'Chats',
  //   label: '9',
  //   href: '/chats',
  //   icon: <IconMessages size={18} />,
  // },
  // {
  //   title: 'Apps',
  //   label: '',
  //   href: '/apps',
  //   icon: <IconApps size={18} />,
  // },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Users',
  //   label: '',
  //   href: '/users',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/settings',
  //   icon: <IconSettings size={18} />,
  // },
];

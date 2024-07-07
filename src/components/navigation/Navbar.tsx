import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Paw from '@/assets/Paw2.svg';
import { useAuth } from '@/Context/useAuth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
  ADMIN_DASHBOARD,
  CUSTOMER_DASHBOARD,
  EMPLOYEE_DASHBOARD,
  LOGIN,
  REGISTER,
  VET_DASHBOARD,
  SETTINGS_PROFILE
} from '@/Route/router-const';
import ThemeSwitch from '../vet_components/theme-switch';
import { useAuthNavigation } from '@/Context/useAuthNavigation';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const { navigateToLogin } = useAuthNavigation();
  const handleClick = () => {
    logout();
    navigateToLogin();
  };
  const navigate = useNavigate();
  const role = user?.role || '0';

  let path = '';
  switch (role) {
    case 'Admin':
      path = ADMIN_DASHBOARD;
      break;
    case 'Employee':
      path = EMPLOYEE_DASHBOARD;
      break;
    case 'Vet':
      path = VET_DASHBOARD;
      break;
    case 'Customer':
      path = CUSTOMER_DASHBOARD;
      break;
    default:
      path = CUSTOMER_DASHBOARD;
  }
  const handleLoginClick = () => {
    navigate(`/${LOGIN}`);
  };

  const handleRegisterClick = () => {
    navigate(`/${REGISTER}`);
  };

  const navigateToUserProfile = () => {
    navigate(`/${path}/${SETTINGS_PROFILE}`);
  };

  const navigateToDashboard = () => {
    navigate(`/${path}`);
  };

  const dashboardNames = {
    Admin: 'Admin Dashboard',
    Employee: 'Employee Dashboard',
    Vet: 'Vet Dashboard',
    Customer: 'Customer Dashboard'
  };

  return (
    <div className='fixed z-50 top-0 left-0 min-w-full flex bg-[--nav-header] pb-8 justify-between'>
      <div className='flex items-center'>
        <img src={Paw} className='ml-[3rem] mt-[2rem] w-[50px] h-[50px]' alt='' />
        <Header />
      </div>
      {isLoggedIn() ? (
        <div className='flex items-start mt-[2.25rem] mr-[3rem]'>
          <div className='mr-5'>
            <ThemeSwitch />
          </div>
          {/* <Dropdown placement="bottom-end">
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                textValue="profile"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard" onClick={navigateToDashboard}>
                {(user &&
                  user.role &&
                  dashboardNames[user.role as keyof typeof dashboardNames]) ||
                  "My Dashboard"}
              </DropdownItem>
              <DropdownItem key="userProfile" onClick={navigateToUserProfile}>
                User Profile
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-10 w-10 rounded-full bg-[--avatar]'>
                <Avatar className='h-10 w-10 bg-[--avatar]'>
                  <AvatarImage src='/avatars/01.png' alt='@shadcn' />
                  <AvatarFallback className='bg-[--avatar]'>
                    {user?.userName?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>{user?.userName}</p>
                  <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem key='dashboard' onClick={navigateToDashboard}>
                  {(user && user.role && dashboardNames[user.role as keyof typeof dashboardNames]) || 'My Dashboard'}
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem key='userProfile' onClick={navigateToUserProfile}>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem key='logout' color='danger' onClick={handleClick}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='mr-[3rem] flex items-center'>
          <div className='mr-5'>
            <ThemeSwitch />
          </div>
          <Button className='bg-[#DB2777] justify-self-end mr-3' onClick={handleLoginClick}>
            Login
          </Button>

          <Button className='bg-[#DB2777] justify-self-end' onClick={handleRegisterClick}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

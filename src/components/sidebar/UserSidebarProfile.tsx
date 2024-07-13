import { useAuth } from '@/Context/useAuth';
import { useAuthNavigation } from '@/Context/useAuthNavigation';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { MoreVertical } from 'lucide-react';
export default function UserSidebarProfile() {
  const { navigateToLogin, logout } = useAuthNavigation();

  const handleLogout = () => {
    logout(); // Call the logout function when the logout button is clicked
    navigateToLogin();
  };
  return (
    <Popover placement='bottom' showArrow={true}>
      <PopoverTrigger>
        <MoreVertical size={24} />
      </PopoverTrigger>
      <PopoverContent>
        <div className=''>
          <Button className='bg-custom-lightBlue text-white' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

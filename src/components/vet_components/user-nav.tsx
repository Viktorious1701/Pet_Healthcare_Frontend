import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_DASHBOARD,
  CUSTOMER_DASHBOARD,
  EMPLOYEE_DASHBOARD,
  SETTINGS_PROFILE,
  VET_DASHBOARD,
} from "@/Route/router-const";
import { useAuth } from "@/Context/useAuth";
import { useAuthNavigation } from "@/Context/useAuthNavigation";

export function UserNav() {
  const location = useLocation();

  const { user, logout } = useAuth();
  
  const { navigateToLogin } = useAuthNavigation();
  const handleClick = () => {
    logout();
    navigateToLogin();
    
  }
  const navigate = useNavigate();
  const role = user?.role || "0";

  let path = "";
  switch (role) {
    case "Admin":
      path = ADMIN_DASHBOARD;
      break;
    case "Employee":
      path = EMPLOYEE_DASHBOARD;
      break;
    case "Vet":
      path = VET_DASHBOARD;
      break;
    case "Customer":
      path = CUSTOMER_DASHBOARD;
      break;
    default:
      path = CUSTOMER_DASHBOARD;
  }

  const navigateToUserProfile = () => {
    navigate(`/${path}/${SETTINGS_PROFILE}`);
  };

  const navigateToDashboard = () => {
    navigate(`/${path}`);
  };

  const navitgateToHome = () => {
    navigate(`/`);
  };

  const dashboardNames = {
    Admin: "Admin Dashboard",
    Employee: "Employee Dashboard",
    Vet: "Vet Dashboard",
    Customer: "Customer Dashboard",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              {user?.userName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!(
            location.pathname === "/vet" || location.pathname.includes("/vet/")
          ) && (
            <DropdownMenuItem key="dashboard" onClick={navigateToDashboard}>
              {(user &&
                user.role &&
                dashboardNames[user.role as keyof typeof dashboardNames]) ||
                "My Dashboard"}
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem key="backToHome" onClick={navitgateToHome}>
            {(location.pathname === "/vet" ||
              location.pathname.includes("/vet/")) && (
              <>
                Back to Home
                <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem key="userProfile" onClick={navigateToUserProfile}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem key="logout" color="danger" onClick={handleClick}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

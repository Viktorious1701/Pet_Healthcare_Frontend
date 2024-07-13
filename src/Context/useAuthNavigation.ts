import { useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD, EMPLOYEE_DASHBOARD, HOME_PAGE, LOGIN, REGISTER } from '@/Route/router-const';
import axiosInstance from '@/Helpers/axiosInstance';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateAfterLogin = (role: string) => {
    switch (role) {
      case 'Admin':
        navigate(`/${ADMIN_DASHBOARD}`);
        break;
      case 'Employee':
        navigate(`/${EMPLOYEE_DASHBOARD}`);
        break;
      case 'Vet':
      default:
        navigate(`/${HOME_PAGE}`);
        break;
    }
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    axiosInstance.defaults.headers.common['Authorization'] = '';
  };
  const navigateToHome = () => navigate(`/${HOME_PAGE}`);
  const navigateToLogin = () => navigate(`/${LOGIN}`);
  const navigateToRegister = () => navigate(`/${REGISTER}`);
  return { navigateAfterLogin, navigateToHome, navigateToLogin, navigateToRegister, logout };
};

import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Button } from '@/components/ui/button';
import Paw from '@/assets/Paw2.svg';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex bg-[#F3F4F6] pb-8 justify-between ">
      <div className="flex">
        <img src={Paw} className="ml-[3rem] mt-[2rem] w-[50px] h-[50px]" alt=""/>
        <Header />
      </div>
      <div className="mr-[3rem]">
        <Button 
          className="bg-[#DB2777] mt-[2.25rem] justify-self-end"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

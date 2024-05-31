import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Paw from '@/assets/Paw2.svg';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] text-center">
      <div className="flex flex-col items-center">
        <img src={Paw} alt="Logo" className="w-24 h-24 mb-8" />
        <h1 className="text-6xl font-bold text-[#DB2777] mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
        <Link to="/">
          <Button className="bg-[#DB2777] text-white hover:bg-[#DB2777]/80">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

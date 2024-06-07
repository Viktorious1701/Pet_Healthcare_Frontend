import { Outlet } from "react-router-dom";
import CustomerSidebar from "@/components/sidebar/CustomerSidebar";

const CustomerDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <CustomerSidebar />
      <div className="flex-1 pl-6">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

import React from 'react';
import ProtectedRoutes from '@/Route/ProtectedRoutes';
import EmployeeDashboard from './EmployeeDashboard';

class ProtectedAdminDashboard extends React.Component {
  render() {
    return (
      <ProtectedRoutes>
        <EmployeeDashboard />
      </ProtectedRoutes>
    );
  }
}

export default ProtectedAdminDashboard;

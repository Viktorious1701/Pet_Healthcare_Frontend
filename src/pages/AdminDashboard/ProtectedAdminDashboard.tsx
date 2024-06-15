import React from 'react';
import ProtectedRoutes from '@/Route/ProtectedRoutes';
import AdminDashboard from '@/pages/AdminDashboard/AdminDashboard';

class ProtectedAdminDashboard extends React.Component {
  render() {
    return (
      <ProtectedRoutes>
        <AdminDashboard />
      </ProtectedRoutes>
    );
  }
}

export default ProtectedAdminDashboard;
import React from 'react';
import ProtectedRoutes from '@/Route/ProtectedRoutes';
import CustomerDashboard from './CustomerDashboard';

class ProtectedCustomerDashboard extends React.Component {
  render() {
    return (
      <ProtectedRoutes>
        <CustomerDashboard />
      </ProtectedRoutes>
    );
  }
}

export default ProtectedCustomerDashboard;
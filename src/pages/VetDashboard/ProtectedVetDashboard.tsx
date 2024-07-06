import React from 'react'
import ProtectedRoutes from '@/Route/ProtectedRoutes'
import VetDashboard from '@/pages/VetDashboard/VetDashboard'

class ProtectedVetDashboard extends React.Component {
  render() {
    return (
      <ProtectedRoutes>
        <VetDashboard />
      </ProtectedRoutes>
    )
  }
}

export default ProtectedVetDashboard

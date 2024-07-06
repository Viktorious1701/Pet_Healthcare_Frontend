import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button' // Adjust the path based on your project structure
import { appointmentCustomerAPI } from '@/Services/AppointmentService'
import { AppointmentGet } from '@/Models/Appointment'
import { useAuth } from '@/Context/useAuth'
import { useNavigate } from 'react-router-dom'
import { CUSTOMER_DASHBOARD, REFUND } from '@/Route/router-const'
import { useTheme } from '@/components/vet_components/theme-provider' // Import the useTheme hook

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table' // Adjust the path based on your project structure

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([])
  const { user } = useAuth()
  const username = user?.userName
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme() // Use the useTheme hook to get the current theme

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const appointmentsPerPage = 5

  // Filter state
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const fetchAppointments = async () => {
      try {
        const listAppointment = await appointmentCustomerAPI(username ?? '')
        setAppointments(listAppointment?.data || [])
        console.log('Appointments:', listAppointment?.data) // Debugging line
        sessionStorage.setItem('appointments', JSON.stringify(listAppointment?.data || []))
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [username])

  const navigate = useNavigate()

  const handleRating = (appointmentId: number) => {
    navigate(`/${CUSTOMER_DASHBOARD}/rate/${appointmentId}`)
  }

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage

  const currentAppointments = filterStatus
    ? appointments
        .filter((appointment) => appointment.status === filterStatus)
        .slice(indexOfFirstAppointment, indexOfLastAppointment)
    : appointments.slice(indexOfFirstAppointment, indexOfLastAppointment)
  const totalPages = Math.ceil(
    (filterStatus
      ? appointments.filter((appointment) => appointment.status === filterStatus).length
      : appointments.length) / appointmentsPerPage
  )

  const handleCanceling = (appointmentId: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${REFUND}/${appointmentId}`)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const getPaymentStatus = (status: number | null) => {
    switch (status) {
      case 0:
        return 'Pending'
      case 1:
        return 'Paid'
      case 2:
        return 'Refunded'
      case 3:
        return 'Cancelled'
      default:
        return 'Not Settled'
    }
  }

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status)
    setCurrentPage(1)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-6'>
      <div className='bg-gray-700 flex items-center justify-between rounded-md p-2'>
        <h1 className='text-3xl font-bold text-white'>Appointment History</h1>

        <div className='flex space-x-2'>
          <Button className='bg-gray-700 text-white' onClick={() => handleFilterChange(null)}>
            All
          </Button>
          <Button className='bg-gray-700 text-white' onClick={() => handleFilterChange('Booked')}>
            Booked
          </Button>
          <Button className='bg-gray-700 text-white' onClick={() => handleFilterChange('Done')}>
            Done
          </Button>
          <Button className='bg-gray-700 text-white' onClick={() => handleFilterChange('Cancelled')}>
            Cancelled
          </Button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableCaption>A list of your recent appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Pet</TableHead>
              <TableHead>Vet</TableHead>
              <TableHead>Slot Time</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Cancel</TableHead>
              <TableHead>Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments &&
              currentAppointments.map((appointment) => (
                <TableRow
                  key={appointment.appointmentId}
                  className={`${
                    theme === 'dark'
                      ? 'even:bg-gray-600 odd:bg-gray-700 hover:bg-gray-500'
                      : 'even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <TableCell className='font-medium'>{appointment.appointmentId}</TableCell>
                  <TableCell className='font-medium'>{appointment.pet}</TableCell>
                  <TableCell>{appointment.vet}</TableCell>
                  <TableCell>{`${appointment.slotStartTime} - ${appointment.slotEndTime}`}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{getPaymentStatus(appointment.paymentStatus)}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{appointment.totalCost}</TableCell>
                  <TableCell>{appointment.rating ?? 'Not Rated'}</TableCell>
                  <TableCell>
                    <Button
                      className={`mx-1 bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500 transform transition-transform duration-300 hover:scale-105 active:scale-95`}
                      onClick={() => handleCanceling(String(appointment.appointmentId))}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleRating(appointment.appointmentId)}
                      className='bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500 transform transition-transform duration-300 hover:scale-105 active:scale-95'
                    >
                      Rate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9}>Total Appointments</TableCell>
              <TableCell className='text-right' colSpan={3}>
                {appointments.length}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={12} className='text-center'>
                <div className='flex justify-between'>
                  <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className='bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500'
                  >
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500'
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

export default AppointmentManagement

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust the path based on your project structure
import { appointmentCustomerAPI } from '@/Services/AppointmentService';
import { AppointmentGet } from '@/Models/Appointment';
import { useAuth } from '@/Context/useAuth';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_DASHBOARD, PAYMENT, REFUND } from '@/Route/router-const';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Adjust the path based on your project structure

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const { user } = useAuth();
  const username = user?.userName;
  const [loading, setLoading] = useState(true);
  //const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Filter state
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const listAppointment = await appointmentCustomerAPI(username ?? '');
        setAppointments(listAppointment?.data || []);
        console.log('Appointments:', listAppointment?.data); // Debugging line
        sessionStorage.setItem('appointments', JSON.stringify(listAppointment?.data || []));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [username]);

  const navigate = useNavigate();

  const handleRating = (appointmentId: number) => {
    navigate(`/${CUSTOMER_DASHBOARD}/rate/${appointmentId}`);
  };

  const handleContinue = (appointmentId: number, willPay: boolean) => {
    if (user?.role === 'Customer' && appointmentId) {
      navigate(`/${PAYMENT}`, { state: { appointmentId, willPay } });
    }
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

  const currentAppointments = filterStatus
    ? appointments
        .filter((appointment) => appointment.status === filterStatus)
        .slice(indexOfFirstAppointment, indexOfLastAppointment)
    : appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(
    (filterStatus
      ? appointments.filter((appointment) => appointment.status === filterStatus).length
      : appointments.length) / appointmentsPerPage
  );

  const handleCanceling = (appointmentId: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${REFUND}/${appointmentId}`);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getPaymentStatus = (status: number | null) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Paid';
      case 2:
        return 'Refunded';
      case 3:
        return 'Cancelled';
      default:
        return 'Not Settled';
    }
  };

  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen'>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>Appointment History</h1>
          <div className='flex space-x-2'>
            {['All', 'Boooked', 'Done', 'Cancelled'].map((status) => (
              <Button
                key={status}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  filterStatus === (status === 'All' ? null : status)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
                }`}
                onClick={() => handleFilterChange(status === 'All' ? null : status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
        <div className='overflow-x-auto rounded-lg shadow'>
          <Table className='w-full'>
            <TableHeader>
              <TableRow className='bg-gray-100 dark:bg-gray-700'>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Appointment ID
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Pet
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Vet
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Slot Time
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Service
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Date
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Payment Status
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Status
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Total Cost
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Rating
                </TableHead>
                <TableHead className='py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment) => (
                <TableRow
                  key={appointment.appointmentId}
                  className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out'
                >
                  <TableCell className='py-4 px-6 text-sm font-medium text-gray-900 dark:text-white'>
                    {appointment.appointmentId}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.pet}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.vet}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>{`${appointment.slotStartTime} - ${appointment.slotEndTime}`}</TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.service}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.date}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(appointment.paymentStatus)}`}
                    >
                      {getPaymentStatus(appointment.paymentStatus)}
                    </span>
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.totalCost}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm text-gray-500 dark:text-gray-300'>
                    {appointment.rating ?? 'Not Rated'}
                  </TableCell>
                  <TableCell className='py-4 px-6 text-sm font-medium'>
                    <div className='flex space-x-2'>
                      <Button
                        onClick={() => handleCanceling(String(appointment.appointmentId))}
                        className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200'
                        disabled={appointment.status === 'Done' || appointment.status === 'Cancelled'}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleRating(appointment.appointmentId)}
                        className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
                        disabled={appointment.status !== 'Done' || appointment.rating !== null}
                      >
                        Rate
                      </Button>
                      <Button
                        onClick={() => handleContinue(appointment.appointmentId, true)}
                        className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200'
                        disabled={
                          appointment.paymentStatus === 1 ||
                          appointment.status === 'Done' ||
                          appointment.status === 'Cancelled'
                        }
                      >
                        Pay
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Showing <span className='font-medium'>{indexOfFirstAppointment + 1}</span> to{' '}
              <span className='font-medium'>{Math.min(indexOfLastAppointment, appointments.length)}</span> of{' '}
              <span className='font-medium'>{appointments.length}</span> results
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for status colors
const getPaymentStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    case 1:
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    case 2:
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    case 3:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Booked':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    case 'Done':
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    case 'Cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

export default AppointmentManagement;

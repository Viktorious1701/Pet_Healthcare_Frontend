// DashboardHome.jsx
import RevenueChart from '@/components/RevenueChart';
import { useEffect, useState } from 'react';

const fetchBookingsThisMonth = () => {
    // Placeholder function to fetch bookings for the current month
    return 123; // Replace with actual data fetching logic
  };
  
  const fetchCancelledBookings = () => {
    // Placeholder function to fetch cancelled bookings
    return 20; // Replace with actual data fetching logic
  };
  
  const fetchAverageVetRatings = () => {
    // Placeholder function to fetch average vet ratings
    return 4.5; // Replace with actual data fetching logic
  };
const DashboardHome = () => {
  // Replace these with actual data upon api call
   //State variables to store the fetched data
   const [bookingsThisMonth, setBookingsThisMonth] = useState(0);
   const [cancelledBookings, setCancelledBookings] = useState(0);
   const [averageVetRatings, setAverageVetRatings] = useState(0);
    // Dummy data for revenue
    const appointmentsRevenue = 60000;
    const hospitalizationRevenue = 63456.78;
   // Fetch data on component mount
   useEffect(() => {
     const fetchData = async () => {
       const bookings = await fetchBookingsThisMonth();
       const cancelled = await fetchCancelledBookings();
       const ratings = await fetchAverageVetRatings();
 
       setBookingsThisMonth(bookings);
       setCancelledBookings(cancelled);
       setAverageVetRatings(ratings);
     };
 
     fetchData();
   }, []);

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-custom-pink text-white p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Bookings This Month</h3>
          <div className="text-4xl font-bold">{bookingsThisMonth}</div>
        </div>
        <div className="bg-custom-pink text-white p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Bookings Canceled</h3>
          <div className="text-4xl font-bold">{cancelledBookings}</div>
        </div>
        <div className="bg-custom-pink text-white p-5 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Average Vet Rating</h3>
          <div className="text-4xl font-bold">{averageVetRatings}</div>
        </div>
      </div>
      <RevenueChart
          appointmentsRevenue={appointmentsRevenue}
          hospitalizationRevenue={hospitalizationRevenue}
        />
    </div>
  );
};

export default DashboardHome;
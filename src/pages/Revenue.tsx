import Report from "@/components/Report";
const Revenue = () => {
    const sampleData = [
      {
        category: 'Hospitalization',
        time: '5:12 pm',
        note: 'Belanja di pasar',
        amount: '-326.800',
      },
      {
        category: 'Booking',
        time: '6:45 pm',
        note: 'Naik bus umum',
        amount: '-15.000',
      },
      {
        category: 'Others',
        time: '9:30 am',
        note: 'Bayar Listrik',
        amount: '-185.750',
      },
    ];
  
    return (
      <div className="bg-white p-5 rounded-lg mb-5 flex-1 overflow-y-auto">
        <header className="flex justify-between items-center mb-5">
          <div className='header-content'>
            <h1 className="text-2xl font-bold text-pink-600">Revenue</h1>
          </div>
          <p className="text-gray-500">20 - 5 - 2024</p>
        </header>
        <section className="expense-details">
          <div className="expense-chart mb-5">
            <div className="bar-chart bg-gray-200 p-5 rounded-lg">
              {/* Add bar chart implementation here */}
            </div>
          </div>
          <div className="expense-list">
            <Report day="Today" data={sampleData} />
            <Report day="Yesterday" data={sampleData} />
          </div>
        </section>
      </div>
    );
  }
  
  export default Revenue;
  
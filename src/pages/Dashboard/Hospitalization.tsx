import { useState } from 'react';
import logo from '@/assets/react.svg';
import SearchBar from '../../components/SearchBar';


interface Hospitalization {
  id: number;
  cost: number;
}

const Hospitalization = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const hospitalizations: Hospitalization[] = [
    { id: 1, cost: 500 },
    { id: 2, cost: 300 },
    { id: 3, cost: 400 },
    // Add more Hospitalizations as needed
  ];

  const filteredHospitalizations = hospitalizations.filter((hospitalization) =>
    hospitalization.id.toString().includes(searchTerm)
  );

  const totalHospitalizationCost = filteredHospitalizations.reduce((acc, curr) => acc + curr.cost, 0);

  const handleViewDetails = (hospitalizationId: number) => {
    // Implement view details logic here
    console.log(`Viewing details for hospitalization ID: ${hospitalizationId}`);
  };

  return (
    <div className="bg-white p-5 rounded-lg mb-5 flex-1 overflow-y-auto">
      <header className="flex items-center justify-between bg-custom-pink p-4 rounded-t-lg">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 text-white text-lg font-semibold">Revenue</span>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder='Search Hospitalizations...'/>
      </header>
      <section className="revenue-details">
        <div className="appointments">
          <h2 className="text-lg font-bold mb-2">Hospitalizations</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-right">Cost</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitalizations.map((hospitalization) => (
                <tr key={hospitalization.id} className="border-b">
                  <td className="py-2 px-4">Hospitalization {hospitalization.id}</td>
                  <td className="py-2 px-4 text-right">${hospitalization.cost}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleViewDetails(hospitalization.id)}
                      className="bg-custom-blue text-white px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td className="py-2 px-4 font-bold">Total:</td>
                <td className="py-2 px-4 text-right font-bold">${totalHospitalizationCost}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Hospitalization;

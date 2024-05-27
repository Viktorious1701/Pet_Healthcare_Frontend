import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/Paw2.svg';

// Sample account data
const accounts = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  // Add more accounts as needed
];

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateAccount = (accountId: number) => {
    // Implement account update logic here
    console.log(`Updating account with ID: ${accountId}`);
  };

  const handleDeleteAccount = (accountId: number) => {
    // Implement account deletion logic here
    console.log(`Deleting account with ID: ${accountId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="flex items-center justify-between bg-custom-pink p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 text-white text-lg font-semibold">Accounts</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300"
          />
        </div>
      </header>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="py-2 px-4">{account.name}</td>
                  <td className="py-2 px-4">{account.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleUpdateAccount(account.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Accounts;

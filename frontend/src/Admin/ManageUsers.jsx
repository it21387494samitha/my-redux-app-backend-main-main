import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import ReactPaginate from 'react-paginate'; // Pagination
import { CSVLink } from 'react-csv'; // CSV export
import { jsPDF } from 'jspdf'; // PDF export
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton Loader styling

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Dark Mode state
  const [sortField, setSortField] = useState(null); // Sorting state
  const [sortDirection, setSortDirection] = useState('asc');
  const usersPerPage = 5; // Number of users per page

  // Fetch user data from your API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://newslt-mern.azurewebsites.net/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Sorting logic
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedUsers = [...currentUsers].sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField].toString().toLowerCase();
      const fieldB = b[sortField].toString().toLowerCase();
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Dark mode toggle
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [ "Name", "Email"];
    const tableRows = [];

    users.forEach(user => {
      const userData = [
        user.username,
        
        user.email,

      ];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Users List", 14, 15);
    doc.save("users.pdf");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-6 mt-20">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold mb-10 text-gray-900 dark:text-white text-center tracking-wide shadow-lg">
            Manage Users
          </h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg"
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex justify-end mb-4 space-x-4">
          <CSVLink
            data={users}
            filename={"users.csv"}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Export to CSV
          </CSVLink>
          <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Export to PDF
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="flex flex-col items-center">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} height={40} width={'100%'} className="mb-4" />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-400 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('username')}>
                    First Name {sortField === 'username' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                 
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
               
                  
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
                {sortedUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-blue-500 dark:text-blue-400 mr-2" />
                        <span>{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <FaEnvelope className="text-yellow-500 dark:text-yellow-400 mr-2" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">

                    </td>
                    <td className="py-3 px-6 text-left">

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end p-4">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'flex'}
                pageClassName={'mx-2'}
                previousClassName={'mx-2'}
                nextClassName={'mx-2'}
                activeClassName={'text-blue-600 font-bold'}
                disabledClassName={'text-gray-400'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;

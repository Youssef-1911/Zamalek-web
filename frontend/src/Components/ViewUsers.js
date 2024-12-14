import React, { useState, useEffect } from 'react';


const ViewUsers = ({navigate}) => {
  const [users, setusers] = useState([]);

  const fetchUsers = () => {
    fetch('http://localhost:1911/users/view')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch Users');
          return [];
        }
      })
      .then((data) => {
        setusers(data);
      })
      .catch((error) => {
        console.error('Error fetching Users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="users-container">
      <h1>All Users</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.NAME}</td>
                <td>{user.EMAIL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => navigate('admin-page')}>
        Back to Admin page
      </button>
    </div>
  );
};


  

export default ViewUsers;

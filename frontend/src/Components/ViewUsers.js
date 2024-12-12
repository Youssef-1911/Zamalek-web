import React, { useState, useEffect } from 'react';


const ViewUsers = () => {
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
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.ID}>
                        <strong>ID:</strong> {user.ID} <br />
                        <strong>Username:</strong> {user.USERNAME} <br />
                        <strong>Email:</strong> {user.EMAIL} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewUsers;

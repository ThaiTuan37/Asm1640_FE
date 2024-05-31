import React, { useEffect, useState } from 'react';
import './datatable.css';
import { Link } from 'react-router-dom'; 
import userApi from '../../api/userApi';

function Datatable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAll();
        console.log(response);
        setUsers(response.data)
      } catch (error) {
        console.log('Fail to fetch', error)
      }
    }
    fetchUsers();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="datatable-container">
      <h1>User Data</h1>
      <div className="datatableTitle">
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <table className="datatable">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Account Status</th>
            <th>Faculty</th>
            <th>Role</th>
            {/* <th>Status</th>
              <th>Action</th>  */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.dob)}</td>
              <td>{user.phone_number}</td>
              <td>{user.gender ? 'Male' : 'Female'}</td>
              <td>{user.account_status ? 'Active' : 'Inactive'}</td>
              <td>{user.faculty}</td>
              <td>{user.role}</td>
             
               
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable;
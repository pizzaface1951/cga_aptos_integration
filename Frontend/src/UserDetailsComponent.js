import React from 'react';

const UserDetailsComponent = ({ details }) => {
  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Email:</strong> {details.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default UserDetailsComponent;
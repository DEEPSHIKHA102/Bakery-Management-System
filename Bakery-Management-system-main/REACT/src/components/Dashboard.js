import React from 'react';
import jwt_decode from 'jwt-decode';

function Dashboard() {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);

  return (
    <div>
      <p> Welcome {decodedToken.name}</p>
      <p>User Email: {decodedToken.email}</p>
      <p>id {decodedToken.id}</p>
    </div>
  );
}

export default Dashboard;

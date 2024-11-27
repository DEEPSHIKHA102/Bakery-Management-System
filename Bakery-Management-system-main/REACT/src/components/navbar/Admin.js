import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import './Admin.css'
function Admin() {
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate('/create-product');
  };
  const handleClickView = () => {
    navigate('/ViewProducts');
  };
  const handleClickComplain = () => {
    navigate('/Complain');
  };
  const handleClickOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="admin-page">
      <h2>Admin page</h2>
      <div className="card-row">
        <Card handleClick={handleClickCreate} title="Create Product" action="Create" />
        <Card handleClick={handleClickView} title="View Products" action="View" />
      </div>
      <div className="card-row">
        <Card handleClick={handleClickComplain} title="View complains" action="View" />
        <Card handleClick={handleClickOrders} title="View Orders" action="View" />
      </div>
    </div>
  );
}

export default Admin;

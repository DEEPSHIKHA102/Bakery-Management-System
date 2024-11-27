import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminViewOrder = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/index_order");
        console.log(response.data);
        if (response.data.status === 200) {
          setOrder(response.data.order);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (orderId) => {
    if (window.confirm("Order Done & Delivered")) {
      try {
        const response = await axios.post(`http://localhost:8000/api/destroy-order/${orderId}`);
        console.log(response.data);
        setOrder(orders.filter((order) => order.id !== orderId));
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className='container'>
      <div className='col-md-12'>
        <div className='card1'>
          <div className='card-header'>
            <h4>
              Order Details
              <Link to='/admin' className='btn btn-danger btn-sm float-end'>
                Back
              </Link>
            </h4>
          </div>
          <div className='card-body'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>User Id</th>
                    <th>Price of Order</th>
                    <th>Item Names</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.country}</td>
                      <td>{order.email}</td>
                      <td>{order.fname}</td>
                      <td>{order.lname}</td>
                      <td>{order.address}</td>
                      <td>{order.p_code}</td>
                      <td>{order.city}</td>
                      <td>{order.phone}</td>
                      <td>{order.user_id}</td>
                      <td>{order.total_price}</td>
                      <td>
                        <ul>
                          {order.titles.map((title) => (
                                <li key={title}>{title}</li>
                              ))
                            }
                        </ul>
                      </td>
                      <td>
                      <button type="button" className='btn btn-success btn-sm' onClick={() => handleDelete(order.id)}>Order Done</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewOrder;

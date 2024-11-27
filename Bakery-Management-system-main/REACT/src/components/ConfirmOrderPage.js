import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function ConfirmOrderPage({ updateCartCount }) {
    const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [bill,setBill] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const products = JSON.parse(localStorage.getItem('products'));
      const titles = products.map((product) => product.title);
  
      const response = await axios.post('http://localhost:8000/api/order_storage', {
        email: email,
        country: country,
        fname: firstName,
        lname: lastName,
        address: address,
        p_code: postalCode,
        city: city,
        phone: phone,
        user_id: userId,
        total_price: bill,
        titles: titles,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    toast.success("Product added to cart successfully!");
    localStorage.removeItem('products');
    localStorage.removeItem('price');
    localStorage.removeItem('cartCount')
    updateCartCount(0);
    navigate("/orderplaced")
   
  };

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const billuser= localStorage.getItem('price');
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      setUserId(userId);
      setLoading(false);
      setBill(billuser);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="container">
      <h1>Confirm your Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="p_code">Postal Code:</label>
          <input
            type="text"
            className="form-control"
            id="p_code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        
        <button  type="submit" className="btn btn-primary my-3"  >
           confirm order
        </button>
      </form>
      <div> your total bill is {bill}</div>
      <ToastContainer />
    </div>
  );
}

export default ConfirmOrderPage;

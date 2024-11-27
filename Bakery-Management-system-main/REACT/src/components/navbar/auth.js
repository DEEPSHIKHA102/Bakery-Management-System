import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../Home';
import Dashboard from '../Dashboard';
import AuthUser from '../AuthUser';
import Admin from './Admin';
import CreateProduct from '../CreateProduct';
import ViewProduct from '../ViewProducts';
import EditProduct from '../EditProduct';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import Contact from '../Contact';
import ComplainDisplay from '../ComplainDisplay';
import NewPageProduct from '../NewPageProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CheckoutPage from '../CheckoutPage';
import ConfirmOrderPage from '../ConfirmOrderPage';
import YourOrderPlaced from '../YourOrderPlaced';
import AdminViewOrder from '../AdminViewOrder';
import YourComplainPlaced from '../YourComplainPlaced';
import AboutUs from '../AboutUs';

function Auth() {
  const { token, logout } = AuthUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartcount, setCartCount] = useState(0);

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  useEffect(() => {
   
    //for cartcounter
   const storedCartCount= localStorage.getItem('cartCount');
   if(storedCartCount)
   {
   setCartCount(parseInt(storedCartCount));
   }
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;
      setRole(userRole);
      setLoading(false);
    }
   

  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
        {role === 0 && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          )}
           {role === 0 && (
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About us
              </Link>
            </li>
          )}
       
          {role === 1 && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin Page
              </Link>
            </li>
          )}
          {role === 0 && (
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact us
              </Link>
            </li>
          )}
          <li className="nav-item">
            <span className="nav-link" onClick={logoutUser}>
              Logout
            </span>
          </li>
          {role === 0 && (
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="badge bg-info ml-1 ms-1">{cartcount}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/admin"
            element={role === 1 ? <Admin /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/create-product"
            element={
              role === 1 ? <CreateProduct /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path={`/edit/:id`}
            element={
              role === 1 ? <EditProduct /> : <Navigate to="/dashboard" />
            }
          />
          <Route
                       path="/ViewProducts"
            element={
              role === 1 ? <ViewProduct /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/Complain"
            element={
              role === 1 ? <ComplainDisplay /> : <Navigate to="/dashboard" />
            }
          />


<Route
            path="/orders"
            element={
              role === 1 ? <AdminViewOrder /> : <Navigate to="/dashboard" />
            }
          />





          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/orders" element={<AdminViewOrder />} /> */}
          <Route path="/orderplaced" element={<YourOrderPlaced updateCartCount={updateCartCount}  />} />
          <Route path="/complainplaced" element={<YourComplainPlaced/> }/>
          <Route path="/aboutus" element={<AboutUs/> }/>
          <Route
            path={`/newhomepage/:id`}
            element={<NewPageProduct cartcount={cartcount} updateCartCount={updateCartCount} />}
          />
          <Route path="/checkout" element={<CheckoutPage updateCartCount={updateCartCount} />} />
          <Route path="/confirmorder" element={<ConfirmOrderPage updateCartCount={updateCartCount} />} />
          
        </Routes>
        
      </div>
    </>
  );
}

export default Auth;


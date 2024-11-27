import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartPage({ updateCartCount }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Retrieve products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    setCartProducts(existingProducts);
    calculateTotalPrice(existingProducts);
  }, []);

  const PriceSetting=()=>{
    localStorage.setItem('price', price);
  }
  const calculateTotalPrice = (products) => {
    const totalPrice = products.reduce((sum, product) => sum + parseFloat(product.price), 0);
    setPrice(totalPrice);
  };

  const clearCart = () => {
    // Remove the 'products' key from local storage
    localStorage.removeItem('products');
    setCartProducts([]);
    setPrice(0);
    localStorage.removeItem('cartCount'); 
    toast.success("Cart cleared successfully");
    updateCartCount(0);

  };    

  return (
    <div className="container">
      <h2> Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartProducts.map((product) => (
            <div className="col-4" key={product.id}>
              <div className="card" style={{ width: '18rem' }}>
                <img src={`http://localhost:8000/storage/${product.image}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    <h3>{product.title}</h3>
                  </h5>
                  <p className="card-text">
                    <h2>description: {product.description}</h2>
                  </p>
                  <h3>price: {product.price}</h3>
                  <h2></h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {price>0&&(   <div>Total price: {price}</div>)} */}
    

{price>0 && ( <div> <button className="btn btn-danger my-2" onClick={clearCart}>
          Clear Cart
        </button>
      </div>)}
      


      <ToastContainer />
      <div>
      {price > 0 && (
  <Link to="/confirmorder" className="btn btn-primary my-3" onClick={PriceSetting}>
    Checkout
  </Link>
)}
      
      </div>
    </div>
  );
}

export default CartPage;

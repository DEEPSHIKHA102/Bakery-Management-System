import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function NewPageProduct({ cartcount, updateCartCount }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartcounter,setCartCounter]=useState(0);

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
      setCartCounter(parseInt(storedCartCount)); // just to display on this page
      // updateCartCount(parseInt(storedCartCount)); // for auth page but its not needed as we are already taking it from LS in auth page
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/show/${id}`);
      setProduct(response.data.product);
    } catch (error) { 
      console.log(error);
    }
  };

  const storeProduct = () => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...existingProducts, product];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    const updatedCartCount = cartcount + 1;
    updateCartCount(updatedCartCount); // this values goes to the auth page
    setCartCounter(updatedCartCount); 
    localStorage.setItem('cartCount', updatedCartCount);
    
  };

  return (
    <div className="container">
      <h2 className="mb-4">Product Page</h2>
      <div className="card">
        <img
          src={`http://localhost:8000/storage/${product.image}`}
          className="card-img-top img-fluid"
          alt="Product"
          style={{ maxWidth: '300px' }}
        />
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          <h4 className="card-subtitle mb-3 text-muted">Price: {product.price}</h4>
         
          <h4 className="card-subtitle mb-3 text-muted">Description: {product.description}</h4>
          
          <h4 className="card-text">
            Availability:{' '}
            {product.available === 'true' ? (
              <span className="badge bg-success">Available</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
              
            )}
          </h4>
          {product.available === 'true' && (
            <button className="btn btn-primary" onClick={storeProduct}>
              Add to Cart
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default NewPageProduct;
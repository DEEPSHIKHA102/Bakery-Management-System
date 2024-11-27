import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/index-product");
        console.log(response.data);
        if (response.data.status === 200) {
          setProducts(response.data.Products);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.post(`http://localhost:8000/api/destroy-data/${productId}`);
        console.log(response.data);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='container1'>
      <div className='col-md-12'>
        <div className='card1'>
          <div className='card-header'>
            <h4>
              Product Data
              <Link to='/create-product' className='btn btn-primary btn-sm float-end'>
                Add Product
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
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Weight</th>
                    <th>Image</th>
                    <th>Featured</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td>{product.discount}</td>
                      <td>{product.quantity}</td>
                      <td>{product.weight}</td>
                      <td>
                        <img src={`http://localhost:8000/storage/${product.image}`} width='100px' height='100px' alt='Product' />
                      </td>
                     
                      <td>{product.available }</td>
                      <td>{product.available ? 'Yes' : 'No'}</td>
                      <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-success btn-sm me-2'>Edit</Link>
                        <button type="button" className='btn btn-danger btn-sm' onClick={() => handleDelete(product.id)}>Delete</button>
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

export default ViewProduct;
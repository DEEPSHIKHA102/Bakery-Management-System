import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/edit-data/${id}`);
        console.log(response.data);
        if (response.data.status === 200) {
          setProduct(response.data.product);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('description', product.description);
      formData.append('discount', product.discount);
      formData.append('quantity', product.quantity);
      formData.append('weight', product.weight);
      formData.append('available', product.available);
      formData.append('featured', product.featured);
      formData.append('image', product.image); // Append the image file to the form data
  
      const response = await axios.post(`http://localhost:8000/api/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      console.log(response.data);
      if (response.data.status === 200) {
        // Handle success
      }
    } catch (error) {
      console.error(error);
    }
    navigate('/ViewProducts');
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };


  return (
    <div className='container'>
      <div className='col-md-12'>
        <div className='card'>
          <div className='card-header'>
            <h4>Edit Product</h4>
          </div>
          <div className='card-body'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form encType="multipart/form-data" method="post">
              
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>Title</label>
                  <input type='text' className='form-control' id='title' name='title' value={product.title || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='price' className='form-label'>Price</label>
                  <input type='text' className='form-control' id='price' name='price' value={product.price || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='category' className='form-label'>Category</label>
                  <select name='category' className='form-control' id='category' value={product.category || ''} onChange={handleChange} >
                  <option>Cake</option>
   <option>biscuits</option>
   <option>Juice</option>
   </select>
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>Description</label>
                  <textarea type='text' className='form-control' id='description' name='description' value={product.description || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='discount' className='form-label'>Discount</label>
                  <input type='number' className='form-control' id='discount' name='discount' value={product.discount || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='quantity' className='form-label'>Quantity</label>
                  <input type='number' className='form-control' id='quantity' name='quantity' value={product.quantity || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='weight' className='form-label'>Weight</label>
                  <input type='number' className='form-control' id='weight' name='weight' value={product.weight || ''} onChange={handleChange} />
                </div>
                <div className='mb-3'>
  <label htmlFor='image' className='form-label'>Image</label>
  <input type='file' className='form-control' id='image' name='image' onChange={handleFileChange} />
</div>


<div className='mb-3'>
  <label htmlFor='available' className='form-label'>Available</label>
  <input
  type='checkbox'
  className='form-check-input'
  id='available'
  name='available'
  checked={product.available || false}
  onChange={handleChange}

/>

</div>
<div className='mb-3'>
  <label htmlFor='featured' className='form-label'>Featured</label>
  <input
  type='checkbox'
  className='form-check-input'
  id='featured'
  name='featured'
  checked={product.featured ||false}
  onChange={handleChange}
  
/>

</div>

                <button type='button' className='btn btn-primary' onClick={handleUpdate}>Update</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

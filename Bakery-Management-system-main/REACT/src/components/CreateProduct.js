import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateProduct() 
{
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);
  const [available, setAvailable] = useState(false); 
  const [featured, setFeatured] = useState(false);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const availableValue = available ? 1 : 0;
  const featuredValue = featured ? 1 : 0;
  const data = {
    title,
    price,
    category,
    description,
    discount,
    quantity,
    weight,
    image,
    available: availableValue,
    featured: featuredValue,
  };
  console.log(data);

  const submitProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('weight', weight);
    formData.append('available', available);
    formData.append('discount', discount);
    formData.append('featured', featured);

    try {
      const response = await axios.post('http://localhost:8000/api/product_storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        
      
      });
      
      navigate('/admin');
  
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="card-body">
      <form onSubmit={submitProduct} encType="multipart/form-data" method="post">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="add-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Add products
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="price-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Other details
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade card-body boarder show active" id="home-tab-pane" role="tabpanel" aria-labelledby="add-tab" tabIndex="0">
            <div className="form-group mb-3">
              <label>Product Name:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Product Category:</label>
              <select
                name="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Cake</option>
                <option>biscuits</option>
                <option>Juice</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label>Product description:</label>
              <textarea
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="tab-pane fade card-body boarder" id="contact-tab-pane" role="tabpanel" aria-labelledby="price-tab" tabIndex="0">
            <div className="row">
              <div className="col-md-4 form-group mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="col-md-4 form-group mb-3">
                <label>Discount</label>
                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div className="col-md-4 form-group mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="col-md-4 form-group mb-3">
                <label>Weight</label>
                <input
                  type="number"
                  name="weight"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="col-md-8 form-group mb-3">
                <label>Image</label>
                <input type="file" name="image" className="form-control" onChange={handleImageChange} />
                {image && (
                  <div className="col-md-4 form-group mb-3">
                    <img
                      src={image instanceof File ? URL.createObjectURL(image) : image}
                      alt="Product"
                      style={{ marginTop: '10px', maxWidth: '200px' }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-4 form-group mb-3">
                <label>Available</label>
                <input
                  type="checkbox"
                  name="available"
                  className="w-50 h-50"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />
              </div>

              <div className="col-md-4 form-group mb-3">
                <label>Featured</label>
                <input
                  type="checkbox"
                  name="featured"
                  className="w-50 h-50"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;

import React from 'react';
import { Link } from 'react-router-dom';

function CardHome(props) {
  const openNewPage = () => {
    // Implement your logic for opening a new page here
  };

  const token = localStorage.getItem('token');

  return (
    <div>
      <div className="card mx-5 mb-5" style={{ width: '18rem' }} onClick={ openNewPage }>
        <img src={`http://localhost:8000/storage/${props.image}`} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            <strong>Price: </strong> {props.price}
          </p>
          {token ? (
            <Link to={`/newhomepage/${props.id}`} className="btn btn-primary">
              Buy now
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Buy now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardHome;

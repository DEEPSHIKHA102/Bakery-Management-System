import React from 'react';

function CardHome({ handleClick,title,action }) {
  return (
    <div className="card">

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
       
        <button className="btn btn-primary my-3" onClick={handleClick}>
           {action}
          </button>
      </div>
    </div>
  );
}

export default CardHome;

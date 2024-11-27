import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ComplainDisplay = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/index-contact");
        console.log(response.data);
        if (response.data.status === 200) {
            setComplains(response.data.Contacts);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='col-md-12'>
        <div className='card1'>
          <div className='card-header'>
            <h4>
              Complains/Feedback
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
                    <th>name</th>
                    <th>User Id</th>
                    <th>Complain</th>
                    <th>feedback</th>
                    <th>email</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {complains.map((complain) => (
                    <tr key={complain.id}>
                      <td>{complain.id}</td>
                      <td>{complain.name}</td>
                      <td>{complain.user_id}</td>
                      <td>{complain.complain}</td>
                      <td>{complain.feedback}</td>
                      <td>{complain.email}</td>
                
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

export default ComplainDisplay;
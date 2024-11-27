import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
function Contact() {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [complain, setComplain] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [user_id, setUser_id] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8000/api/contact_storage', {
        name: name,
        complain: complain,
        feedback: feedback,
        email: email,
        user_id: user_id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      navigate("/complainplaced")
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const user_id = decodedToken.id;
      setUser_id(user_id);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h1>Feel free to Express your thoughts!</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="complain">Complain:</label>
          <input
            type="text"
            className="form-control"
            id="complain"
            value={complain}
            onChange={(e) => {
              setComplain(e.target.value);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <input
            type="text"
            className="form-control"
            id="feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit Feedback
        </button>
      </form>

    </div>
  );
}

export default Contact;

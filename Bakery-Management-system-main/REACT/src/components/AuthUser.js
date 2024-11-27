import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
 
  //
  

  const [token, setToken] = useState(getToken());
 //

 const saveToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
  setToken(token);

  const decodedToken = jwt_decode(token);
  const userRole = decodedToken.role;

  if (userRole === 1) {
    navigate('/admin');
  } else {
    navigate('/');
  }
};

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return {
    setToken: saveToken,
    token,
    //
    getToken,
    http,
    logout
  };
}

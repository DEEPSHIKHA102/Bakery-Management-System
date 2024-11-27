import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function YourComplainPlaced() {
    const navigate = useNavigate();
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
          navigate('/'); // Replace '/' with the actual homepage route
        }, 3000); // 5000 milliseconds = 5 seconds
    
        return () => clearTimeout(redirectTimer); // Clear the timer when the component unmounts
      }, [navigate]);
    
      return (
        <div className="container">
          <div className="alert alert-success">
            <h2>Request Placed Successfully</h2>
            <p>Thank you for your Request. We have received it and will process it shortly.</p>
            <p>An email confirmation has been sent to your registered email address.</p>
          </div>
        </div>
  )
}

export default YourComplainPlaced
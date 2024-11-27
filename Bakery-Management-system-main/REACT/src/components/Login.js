import { useState } from "react";
import AuthUser from './AuthUser';
import './login.css';
import { Link } from "react-router-dom";
export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = () => {
    // api call
    http.post('/login', { email: email, password: password }).then((res) => {
      setToken(res.data.access_token);
    });
  };


 

  return (
    <div className="login-body">
     <div class="wrapper">
      <div className="form-wrapper sign-up"></div>
      <div className="form-wrapper sign-in">
        <form action="">
          <h2>Login</h2>
          <div className="input-group">
         <input
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                            />
                            <label>Email address:</label>
          </div>
          <div className="input-group">
           <input
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="pwd"
                            />
                            <label>Password:</label>
          </div>
          <div className="forgot-pass">
          <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="button" onClick={submitForm} className="btn-login">
            Login
          </button>
          <div className="sign-link">
          <p>
      Don't have an account? <Link to="/Register" className="signUp-link">Sign Up</Link>
    </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

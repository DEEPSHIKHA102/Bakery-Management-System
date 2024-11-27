import { useState } from "react"
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { Link } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();

    const {http} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        // api call
        http.post('/register',{email:email,password:password,name:name}).then((res)=>{
            navigate('/login');
        })
    }

    return(
        <div className="login-body">
     <div class="wrapper">
      <div className="form-wrapper sign-up">
     
      </div>
      <div className="form-wrapper sign-in">
      <form action="">
          <h2>Register</h2>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Name"
            onChange={e=>setName(e.target.value)}
            id="name" />
            <label>name</label>
          </div>
          <div className="input-group">
            <input type="email" className="form-control" placeholder="Enter email"
                 onChange={e=>setEmail(e.target.value)}
            id="email" />
                      <label>Email address:</label>
          </div>
          <div className="input-group">
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                        <label>Password:</label>
          </div>
          <button type="button" onClick={submitForm} className="btn-login">
            Login
          </button>
          <div className="sign-link">
    <p>
      Already have an account? <Link to="/Login" className="signIn-link">Sign In</Link>
    </p>
  </div>
        </form>
      </div>
    </div>
    </div>
    )
}

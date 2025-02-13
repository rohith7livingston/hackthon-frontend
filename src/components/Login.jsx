import { useState } from "react";
import "./../stylesheet/Login.css";
import {Link} from 'react-router-dom';
function Login() {
    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
       
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call, form validation, etc.)
        console.log('Form Data Submitted: ', formData);
      };

    

       

    return (
        <div>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="email">Email</label>
                    <input 
                        value={formData.email} 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        onChange={handleChange} 
                        required 
                        className="input-log"
                    />

                    <label htmlFor="password">password</label>
                    <input 
                        value={formData.password} 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Create a password" 
                        onChange={handleChange} 
                        required 
                        className="input-log"
                    />

                    <button type="Submit" className="button-log"><Link to={'/home'} className="link">Login</Link></button>
                </form>
            </div>
        </div>
    );
}

export default Login;
import { useState } from "react";
import "./../stylesheet/Login.css";
import { useNavigate } from "react-router-dom";
export let userEmail = ""; 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  userEmail = formData.email;

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:3001/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If email exists and password is correct, navigate to home
        navigate("/home");
      } else {
        setError(data.error); // Show error message
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setError("Server error. Please try again.");
    }
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

          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="input-log"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="button-log">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

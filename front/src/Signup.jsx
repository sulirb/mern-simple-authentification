import { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  // State variables for form inputs and component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup request to the server
      const response = await axios.post(`http://localhost:3000/auth/signup`, {
        email,
        password,
      });
      // Set success message from server response
      setMessage(response.data.message);
    } catch (error) {
      // Handle signup error
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* Display any messages (success or error) */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;

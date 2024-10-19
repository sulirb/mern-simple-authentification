import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Login.css";

const Login = () => {
  // State variables for form inputs and component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Hook for managing cookies
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post(`http://localhost:4000/auth/login`, {
        email,
        password,
        code,
      });
      setMessage(response.data.message);

      if (response.status === 200) {
        // If login is successful, store token and user ID in cookies
        const token = response.data.token;
        const userId = response.data.userId;
        setCookie("token", token, {
          path: "/",
          maxAge: 3600 * 24,
          secure: true,
        });
        setCookie("user_id", userId, {
          path: "/",
          maxAge: 3600 * 24,
          secure: true,
        });

        // Set submission state and redirect after a delay
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // Handle login error
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {isSubmitted ? (
        // Show success message if login is successful
        <div className="is-submitted">User is successfully logged in</div>
      ) : (
        // Show login form if not submitted
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
          <div>
            <label htmlFor="code">Code:</label>
            <input
              type="number"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Connect</button>
        </form>
      )}
      {/* Display any messages (success or error) */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;

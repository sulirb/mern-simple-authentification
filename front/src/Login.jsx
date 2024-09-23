import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, {
        email,
        password,
        code,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        // Connexion réussie, stockez le token dans le navigateur (par exemple, dans localStorage ou un cookie)
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
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/admin/wr");
        }, 2000);
      }
      // Gérer la connexion réussie (par exemple, stocker le token JWT et rediriger)
    } catch (error) {
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {isSubmitted ? (
        <div>User is successfully logged in</div>
      ) : (
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
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;

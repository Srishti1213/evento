import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Mock login - in real app, call API
    if (email === "organizer@example.com" && password === "pass") {
      localStorage.setItem("user", JSON.stringify({ id: 1, role: "organizer" }));
      navigate("/");
    } else if (email === "attendee@example.com" && password === "pass") {
      localStorage.setItem("user", JSON.stringify({ id: 2, role: "attendee" }));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Demo: organizer@example.com / pass (organizer) or attendee@example.com / pass (attendee)</p>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import axios from "axios";

const Login : React.FC<{ onLogin : () => void }> = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:3000/auth/login", {
                username,
                password   
            })

            localStorage.setItem("token", res.data.token);
            onLogin();
        }
        catch(error){
            setError("Login failed. Check username/password.");
        }
    }

    return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;
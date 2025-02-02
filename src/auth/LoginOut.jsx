import React, { useState } from "react";
import { useAuth } from "./AuthProvider";


export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form className="loginout" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export function Logout() {
  const { logout } = useAuth();

  return (
    <div className="auth-buttons">
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}
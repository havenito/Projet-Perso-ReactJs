import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("AuthProvider mounted");
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User loaded from cookies");
    }
  }, []);

  const login = (username, password) => {
    console.log("Attempting to log in");
    if (username === "admin" && password === "1234") {
      const newUser = { username };
      setUser(newUser);
      Cookies.set("user", JSON.stringify(newUser), { expires: 1 });
      console.log("User logged in");
    } else {
      alert("Identifiants incorrects");
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Authentification impossible");
  }
  return context;
}

export { AuthContext };
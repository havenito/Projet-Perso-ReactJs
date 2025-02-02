import { useAuth } from "./AuthProvider";
import { Login } from "./LoginOut";

export function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <>
      <p>Accès refusé. Connectez-vous d'abord</p>
      <Login />
    </>
  );
}
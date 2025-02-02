import { Link } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { Login, Logout } from "../auth/LoginOut";
import './Home.scss';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="auth-buttons">
        {user ? <Logout /> : <Login />}
      </div>

      <h1>Bienvenue dans l'univers League of Legends</h1>

      <div className="grid-container">
        <Link to="/persos">
          <button className="btn-champions">
            Découvrir les Champions
          </button>
        </Link>

        <Link to="/regions">
          <button className="btn-regions">
            Explorer les Régions
          </button>
        </Link>

        <Link to="/contact">
          <button className="btn-contact">
            Nous Contacter
          </button>
        </Link>
      </div>
    </div>
  );
}
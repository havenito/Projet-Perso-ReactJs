import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import "./Header.scss";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageName = location.pathname.split("/").pop();
  const displayName = pageName ? pageName : "League Of Legends";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="header__content">
        {displayName !== "League Of Legends" && (
          <a onClick={handleGoBack} className="header__arrow-link">
            <img
              className="header__arrow"
              src="./fleche.png"
              alt="Retour"
            />
          </a>
        )}
        <img className="header__logo" src="logo-lol.png" alt="Logo Lol" />
        <h1 className="header__title">{displayName}</h1>
        <nav className="header__nav">
          <Link to="/contact" className="header__nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
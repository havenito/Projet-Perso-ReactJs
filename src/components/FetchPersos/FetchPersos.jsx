import React from "react";
import { useNavigate } from "react-router"; // Importer useNavigate
import ApiFetch from "../../api/ApiFetch";
import "./FetchPersos.scss";

export default function FetchPersos() {
  const navigate = useNavigate(); // Initialiser navigate pour gérer la redirection

  const handleChampionClick = (championId) => {
    // Naviguer vers la page des détails du champion
    navigate(`/champion/${championId}`);
  };

  return (
    <ApiFetch
      url="/cdn/15.2.1/data/en_US/champion.json"  // Utilisation du chemin relatif pour contourner le CORS
    >
      {(data) => (
        <div className="perso-container">
          <h1 className="perso-title">Galerie de Champions</h1>
          <div className="perso-gallery">
            {Object.values(data.data).map((champion) => (
              <div
                key={champion.id}
                className="perso-item"
                onClick={() => handleChampionClick(champion.id)} // Rediriger lors du clic
              >
                <div className="perso-link" role="button" tabIndex={0}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${champion.image.full}`}
                    alt={champion.name}
                    className="perso-image"
                  />
                  <p className="perso-name">{champion.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ApiFetch>
  );
}
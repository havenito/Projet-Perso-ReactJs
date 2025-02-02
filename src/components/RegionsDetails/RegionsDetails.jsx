import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Comment } from "../Comments/Comments"; // Ici, on importe "Comment" avec des accolades
import "./RegionsDetails.scss";

export default function RegionDetails() {
  const { regionId } = useParams(); // Récupère l'ID de la région depuis l'URL
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json`
        );
        const data = await response.json();
        
        // Filtre les champions par région (simulé par les tags des champions ici)
        const regionChampions = Object.values(data.data).filter(
          (champion) => champion.tags?.[0] === regionId
        );
        
        setChampions(regionChampions);
      } catch (error) {
        console.error("Error fetching region details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionDetails();
  }, [regionId]);

  if (loading) {
    return (
      <div className="loading-container">
        Chargement...
      </div>
    );
  }

  return (
    <div className="region-details-container">
      <h1 className="region-details-title">
        Détails de la Région: {regionId}
      </h1>
      <div className="region-champions-container">
        {champions.length === 0 ? (
          <p className="no-champions-text">
            Aucun champion trouvé pour cette région.
          </p>
        ) : (
          champions.map((champion) => (
            <div key={champion.id} className="region-champion-card">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                className="champion-image"
              />
              <p className="champion-name">{champion.name}</p>
              <p className="champion-title">{champion.title}</p>
            </div>
          ))
        )}
      </div>

      {/* Ajout de l'espace commentaire ici */}
      <div className="comments-section">
        <h2>Commentaires</h2>
        <Comment regionId={regionId} />
      </div>
    </div>
  );
}
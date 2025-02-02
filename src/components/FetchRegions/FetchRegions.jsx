import { useNavigate } from "react-router";
import ApiFetch from "../../api/ApiFetch";
import "./FetchRegions.scss";

export default function FetchRegion() {
  const navigate = useNavigate();

  const handleRegionClick = (regionId) => {
    navigate(`/regions/${regionId}`);
  };

  return (
    <ApiFetch url="/cdn/15.2.1/data/en_US/champion.json"> 
      {(data) => {
        const regions = Object.values(data.data).reduce((acc, champion) => {
          const region = champion.tags?.[0] || "Unknown"; // Récupération de la région depuis les tags du champion
          if (!acc.includes(region)) {
            acc.push(region);
          }
          return acc;
        }, []);

        return (
          <div className="regions-container">
            <h1 className="regions-title">Liste des Régions de Champions</h1>
            <div className="regions-grid">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="region-card"
                  onClick={() => handleRegionClick(region)}
                >
                  <p className="region-name">{region}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </ApiFetch>
  );
}
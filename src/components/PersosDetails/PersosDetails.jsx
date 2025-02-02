import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // Récupérer le paramètre 'id' de l'URL
import { Comment } from "../Comments/Comments"; // Importer le composant Comment
import "./PersosDetails.scss";

export default function PersosDetails() {
  const { id } = useParams(); // Récupère l'ID du champion depuis l'URL
  const [championDetails, setChampionDetails] = useState(null);

  useEffect(() => {
    if (id) {
      fetchChampionDetails(id);
    }
  }, [id]);

  const fetchChampionDetails = async (championId) => {
    try {
      const response = await fetch(`/cdn/cdn/15.2.1/data/en_US/champion/${championId}.json`);
      const data = await response.json();
      setChampionDetails(data.data[championId]);
    } catch (error) {
      console.error("Error fetching champion details:", error);
    }
  };

  if (!championDetails) return null;

  return (
    <div className="container">
      <div className="card">
        <h3 className="text-2xl font-bold text-center mb-4 text-white">{championDetails.name}</h3>

        <div className="image-container">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/${championDetails.image.full}`}
            alt={championDetails.name}
            className="rounded-lg mb-4"
          />
          <p className="title">{championDetails.title}</p>
          <p className="blurb">{championDetails.blurb}</p>
        </div>

        <div className="details-section">
          <h4 className="section-title">Compétences :</h4>
          <ul className="list">
            {championDetails.spells?.map((spell, index) => (
              <li key={index}>
                <strong>{spell.name}:</strong> {spell.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Affichage des statistiques */}
        <div className="details-section">
          <h4 className="section-title">Statistiques :</h4>
          <ul className="list">
            <li><strong>Vie:</strong> {championDetails.stats.hp}</li>
            <li><strong>Attaque:</strong> {championDetails.stats.attackdamage}</li>
            <li><strong>Défense:</strong> {championDetails.stats.armor}</li>
            <li><strong>Vitesse de déplacement:</strong> {championDetails.stats.movespeed}</li>
          </ul>
        </div>

        {/* Intégration de l'espace de commentaires */}
        <div className="comments-section">
          <Comment regionId={id} />  {/* On passe l'ID du champion ou une autre information si nécessaire */}
        </div>
      </div>
    </div>
  );
}
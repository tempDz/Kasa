import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledCard = styled.div`
  height: 340px;
  width: 340px
  flex-grow: 1;
  margin-bottom: 20px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 0;
  transform: translateY(30px);
  animation: appear 0.5s ease-in-out forwards;

  &:hover {
    cursor: pointer;
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 480px) {
    height: 255px;
    width: 335px;
    justify-items: center;
    margin: 0 auto;
  }
`;

const Cover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
`;

const Title = styled.div`
  position: absolute;
  left: 5.88%;
  right: 5.88%;
  top: 78.82%;
  bottom: 5.88%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 540;
  font-size: 18px;
  line-height: 142.6%;
  display: flex;
  align-items: flex-end;
  color: #ffffff;

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;


// Crée un composant "Card" optimisé avec React.memo pour éviter des rendus inutiles lors de mises à jour des propriétés.
const Card = React.memo(function Card({ listing, delay }) {
  
  // Destructure l'objet "listing" pour extraire les propriétés "title", "cover" et "id".
  const { title, cover, id } = listing;
  
  // Utilise le hook useNavigate() pour gérer la navigation dans l'application.
  const navigate = useNavigate();

  // Crée une fonction "handleCardClick" pour gérer le clic sur la carte et effectuer la navigation vers la page "fiche-logement".
  const handleCardClick = () => {
    navigate(`/fiche-logement/${id}`);
  };

  // Rendu du composant "Card".
  return (
    // Utilise le composant de style "StyledCard" et lui passe la propriété "animationDelay" pour gérer le délai d'animation.
    // Ajoute l'écouteur d'événement "onClick" pour gérer le clic sur la carte.
    <StyledCard style={{ animationDelay: `${delay}ms` }} onClick={handleCardClick}>
      
      {/* Affiche l'image de couverture en utilisant le composant de style "Cover" et lui passe les propriétés "src" et "alt". */}
      <Cover src={cover} alt={title} />
      
      {/* Inclut le composant de style "Overlay" pour ajouter un effet de superposition à la carte. */}
      <Overlay />
      
      {/* Affiche le titre de la liste en utilisant le composant de style "Title". */}
      <Title>{title}</Title>
    </StyledCard>
  );
});


export default Card;

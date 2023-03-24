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


// 1. Crée un composant fonctionnel "Card" optimisé avec React.memo().
const Card = React.memo(function Card({ listing, delay }) {
  
  // 2. Extraire les propriétés title, cover et id de l'objet listing.
  const { title, cover, id } = listing;
  
  // 3. Utilise le hook useNavigate() pour accéder à la fonction de navigation.
  const navigate = useNavigate();
  
  // 4. Crée une fonction handleCardClick pour gérer les clics sur la carte.
  const handleCardClick = () => {
    // 4.1. Navigue vers la route `/fiche-logement/${id}` lorsqu'on clique sur la carte.
    navigate(`/fiche-logement/${id}`);
  };

  // 5. Rendu du composant "Card".
  return (
    // 5.1. Utilise le composant de style StyledCard et lui passe les propriétés "style" et "onClick".
    <StyledCard style={{ animationDelay: `${delay}ms` }} onClick={handleCardClick}>
      
      {/* 5.2. Affiche l'image de la carte en utilisant le composant de style Cover.
           Lui passe les propriétés "src" et "alt". */}
      <Cover src={cover} alt={title} />
      
      {/* 5.3. Affiche un calque de superposition en utilisant le composant de style Overlay. */}
      <Overlay />
      
      {/* 5.4. Affiche le titre de la carte en utilisant le composant de style Title. */}
      <Title>{title}</Title>
    </StyledCard>
  );
});

// 6. Exporte le composant Card par défaut.
export default Card;


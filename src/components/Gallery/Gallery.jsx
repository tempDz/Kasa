// 1. Importation des dépendances
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';
import data from '../../Data/Data';

// 2. Création d'un composant de style pour le conteneur de la galerie
const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1240px;
  margin: 50px auto;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 60px;
  background: #F7F7F7;
  border-radius: 25px;

  @media screen and (max-width: 480px) {
    margin: 22px auto;
    padding: 3%;
    grid-gap: 10px;
    min-width: 375px;
    background: transparent;
  }
`;

// 3. Définition du composant Gallery
const Gallery = React.memo(function Gallery() {
  // 4. Utilisation du hook useState pour gérer l'état des annonces
  const [listings, setListings] = useState([]);

  // 5. Utilisation du hook useEffect pour initialiser l'état des annonces
  useEffect(() => {
    setListings(data);
  }, []);

  // 6. Rendu du composant Gallery
  return (
    <GalleryContainer>
      {/* 7. Boucle sur les annonces pour générer des composants Card */}
      {listings.map((listing, index) => (
        <Card
          key={listing.id}
          listing={listing}
          show={true}
          delay={index * 100}
        />
      ))}
    </GalleryContainer>
  );
});

// 8. Exportation du composant Gallery par défaut
export default Gallery;

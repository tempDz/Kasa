import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import arrowImage from '../../assets/fleche carousel.png';
import Data from '../../Data/Data';
import  { COLORS, STYLES } from '../../styles/styles';

const CarouselContainer = styled.div`
  width:90%;
  max-width: 1240px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 255px;
    margin: 0 auto;
    }

`;

const CarouselImageContainer = styled.div`
  height: 415px;
  border-radius: 25px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 768px) {
    border-radius: 10px;
    }

`;

const CarouselArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  right: 50px;

  @media screen and (max-width: 768px) {
    left: 0;
    right: 0;
    width: 100%;
    padding: 10px;
  }
`;


const CarouselArrow = styled.div`
  height: 80px;
  width: 50px;
  cursor: pointer;
  background-image: url(${arrowImage});

  @media screen and (max-width: 768px) {
    height: 25px;
    width: 15px;
    background-size: contain;
  }

`;

const CarouselArrowLeft = styled(CarouselArrow)`
  background-position: right center;
  transform: rotateY(180deg);
`;

const CarouselArrowRight = styled(CarouselArrow)`
  background-position: left center;
`;

const CarouselImage = styled.img`
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  user-select: none;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.isActive ? "1" : "0")};
  position: absolute;
`;

const CounterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const CounterText = styled.span`
font-family: ${STYLES.FONT_FAMILY};
font-weight: ${STYLES.FONT_WEIGHT_BOLD};
font-size: 25px;
Line height:25.67px;
color: ${COLORS.WHITE};
  z-index: 1;
`;

// 1. Créer un composant Arrow pour les flèches de navigation du carrousel
const Arrow = ({ direction, onClick }) => {
  // 1.1. Vérifier si la direction de la flèche est à gauche
  const isLeft = direction === "left";
  return (
    <div onClick={onClick} style={{ transform: isLeft ? "rotateY(180deg)" : "" }}>
      <CarouselArrow
        isLeft={isLeft}
        style={{
          backgroundImage: `url(${arrowImage})`,
          backgroundPosition: isLeft ? "right center" : "left center",
        }}
      />
    </div>
  );
};

// 2. Créer un composant Counter pour afficher la position actuelle de l'image dans le carrousel
const Counter = ({ currentIndex, total }) => (
  <CounterContainer>
    <CounterText>
      {currentIndex + 1}/{total}
    </CounterText>
  </CounterContainer>
);

// 3. Créer un composant fonctionnel Carousel en utilisant React.memo pour optimiser les performances
const Carousel = React.memo(function Carousel(props) {
  // 3.1. Utiliser le hook useState pour gérer l'index de l'image actuelle et l'état d'animation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // 3.2. Récupérer les informations de l'appartement et les images
  const apartment = Data.find(item => item.id === props.apartmentId);
  const images = apartment.pictures;

  // 3.3. Créer une fonction handleClickPrev pour passer à l'image précédente
  const handleClickPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prevIndex =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  // 3.4. Créer une fonction handleClickNext pour passer à l'image suivante
  const handleClickNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // 3.5. Utiliser le hook useEffect pour gérer le délai d'animation
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [currentIndex]);

    // 3.6. Rendu du composant Carousel
    return (
      <CarouselContainer>
        <CarouselImageContainer>
          {// 3.6.1. Parcourir le tableau d'images et créer un composant CarouselImage pour chaque image
          images.map((image, index) => (
            <CarouselImage
              key={index}
              src={image}
              isActive={index === currentIndex}
            />
          ))}
          {// 3.6.2. Afficher les flèches de navigation seulement si le nombre d'images est supérieur à 1
          images.length > 1 && (
            <CarouselArrowContainer>
              <Arrow direction="left" onClick={handleClickPrev} />
              <Arrow direction="right" onClick={handleClickNext} />
            </CarouselArrowContainer>
          )}
          {// 3.6.3. Afficher le compteur d'images seulement si le nombre d'images est supérieur à 1
          images.length > 1 && (
            <Counter currentIndex={currentIndex} total={images.length} />
          )}
        </CarouselImageContainer>
      </CarouselContainer>
    );
  });
  
  // 4. Exporter le composant Carousel par défaut
  export default Carousel;
  
// Importer les éléments nécessaires de React, styled-components et autres fichiers
import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import arrowImage from "../../assets/fleche.png";
import { COLORS, STYLES } from '../../styles/styles';

// Créer un composant style pour l'élément conteneur de l'accordion
const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 20px 0;
  // Définir la largeur du composant en utilisant la propriété 'width' passée en tant que prop.
  // Si la propriété 'width' est définie, utilisez cette valeur (en pourcentage).
  // Sinon, utilisez une largeur de 100% par défaut.
  width: ${props => props.width ? `${props.width}%` : '100%'};
`;

// Créer un composant style pour l'entête de l'accordion
const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  height: 47px;
  padding: 0 20px;
  border-radius: 5px;
  background-color: ${COLORS.RED};
  color: ${COLORS.WHITE};
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .2);

  @media screen and (max-width: 768px) {
    height: 30px;
    img {
      width: 15px;
  }
`;

// Créer un composant style pour le titre de l'accordion
const Title = styled.h2`
  display: flex;
  align-items: center;
  font-family: ${STYLES.FONT_FAMILY};
  font-style: normal;
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: 24px;
  line-height: 142.6%;
  margin:0;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

// Créer un composant style pour le texte de l'accordion
const Text = styled.span`
  font-family: ${STYLES.FONT_FAMILY};
  font-weight: ${STYLES.FONT_WEIGHT_MEDIUM};
  font-size: 16px;
  line-height: 140%;
  color: ${COLORS.RED};
`;

// Créer un composant style pour le contenu de l'accordion
const AccordionContent = styled.div`
  padding: 0 20px;
  border-radius: 5px;
  background-color: #f7f7f7;
  overflow: hidden;
  max-height: ${props => props.maxHeight}px;
  transition: max-height 0.3s ease-out;
  ${props => !props.isOpen && `
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
  `}
`;


// Créer un composant style pour l'image de la flèche de l'accordion
const ArrowImage = styled.img`
  transform: ${props => props.isOpen ? 'rotate(0deg)' : 'rotate(-180deg)'};
  transition: transform 0.2s ease-in-out;
`;

// Fonction du composant Accordion
function Accordion({ title, children, width }) {
  // Déclarer l'état pour déterminer si l'accordion est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);
  // Créer une référence pour accéder au contenu de l'accordion
  const contentRef = useRef(null);
  // Fonction pour basculer l'état ouvert/fermé de l'accordion
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  // Utiliser useMemo pour calculer la hauteur maximale du contenu de l'accordion
  const maxHeight = useMemo(() => {
    return contentRef.current ? contentRef.current.scrollHeight : 0;
  }, [contentRef, isOpen]);
  // Retourner le rendu du composant Accordion
  return (
    // Crée un conteneur pour l'accordéon en utilisant le composant de style AccordionWrapper
    // et lui passe la propriété "width".
    <AccordionWrapper width={width}>
      <AccordionHeader isOpen={isOpen} onClick={toggleAccordion}>
        <Title>{title}</Title>
        <ArrowImage src={arrowImage} alt="flèche" isOpen={isOpen} />
      </AccordionHeader>
      <AccordionContent isOpen={isOpen} maxHeight={maxHeight} ref={contentRef}>
        <Text>{children}</Text>
      </AccordionContent>
    </AccordionWrapper>
  );
}

export default Accordion;
  
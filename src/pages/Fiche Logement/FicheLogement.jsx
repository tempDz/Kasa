// 1. Import des dépendances et composants
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Accordion from "../../components/Accordion/Accordion";
import Data from '../../Data/Data';
import { FicheLogementContainer, InfoContainer, InfoLogement, InfoTitreLogement, InfoDescriptifLogement, TagsContainer, Tag, RateLogement, NameContainer, Name, Picture, RatingContainer, Rating, AccordionContainer } from './FicheLogement.styles';

// 2. Définition du composant FicheLogement
function FicheLogement() {
  // 3. Déclaration des états locaux
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [apartment, setApartment] = useState(null);
  const [screenSize, setScreenSize] = useState("medium");

  // 4. Récupération de l'ID de l'appartement depuis l'URL
  const { id } = useParams();

  // 5. Gestion de la recherche de l'appartement
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!apartment) {
      const foundApartment = Data.find((item) => item.id === id);
      if (foundApartment) {
        setApartment(foundApartment);
      } else if (id !== null) {
        console.error(`Appartement avec l'ID ${id} non trouvé`);
      }
      setSearchCompleted(true);
    }
  }, [apartment, id]);

  // 6. Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 481) {
        setScreenSize("small");
      } else {
        setScreenSize("medium");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 7. Gestion de l'erreur 404
  const renderError404 = () => {
    if (!apartment && searchCompleted) {
      return <Navigate to="/404" />;
    }
    return null;
  };

  // 8. Rendu du composant
  return (
    <>
      {apartment && (
        <>
          <Carousel apartmentId={apartment.id} />
          <FicheLogementContainer>
            <InfoContainer>
              <InfoLogement>
                <InfoTitreLogement>
                  <div>{apartment.title}</div>
                </InfoTitreLogement>
                <InfoDescriptifLogement>
                  <div>{apartment.location}</div>
                </InfoDescriptifLogement>
                <TagsContainer>
                  {apartment.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </InfoLogement>
              <RateLogement>
                <NameContainer>
                  <Name>{apartment.host.name}</Name>
                  <Picture
                    src={apartment.host.picture}
                    alt={apartment.host.name}
                  />
                </NameContainer>
                <RatingContainer>
                  <Rating rating={apartment.rating} />
                </RatingContainer>
              </RateLogement>
            </InfoContainer>
            <AccordionContainer>
            <Accordion
                  title="Description"
                  width={screenSize === "small" ? "100" : "45"}
                >
                  <p>{apartment.description}</p>
                </Accordion>
                <Accordion
                  title="Équipements"
                  width={screenSize === "small" ? "100" : "45"}
                >
                  {apartment.equipments.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </Accordion>
              </AccordionContainer>
            </FicheLogementContainer>
          </>
      )}
      {/* 9 Rendu de l'erreur 404 si nécessaire */}
      {renderError404()}
    </>
  );
}

export default FicheLogement;

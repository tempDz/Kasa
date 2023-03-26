import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Accordion from "../../components/Accordion/Accordion";
import Data from '../../Data/Data';
import Error404 from "../../pages/Error 404/Error404";
import { FicheLogementContainer, InfoContainer, InfoLogement, InfoTitreLogement, InfoDescriptifLogement, TagsContainer, Tag, RateLogement, NameContainer, Name, Picture, RatingContainer, Rating, AccordionContainer } from './FicheLogement.styles';

// 1. Créer le composant fonctionnel FicheLogement
function FicheLogement() {
  // 2. Gérer les états avec les hooks useState
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [apartment, setApartment] = useState(null);
  const [screenSize, setScreenSize] = useState("medium");

  // 3. Extraire l'ID de l'appartement avec useParams
  const { id } = useParams();

  // 4. Rechercher l'appartement dans les données avec le premier hook useEffect
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

  // 5. Gérer le redimensionnement de la fenêtre avec le deuxième hook useEffect
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

  // 6. Créer la fonction renderError404 pour afficher le composant Error404
  const renderError404 = () => {
    if (!apartment && searchCompleted) {
      return <Error404 />;
    }
    return null;
  };

  // 7. Rendu du composant FicheLogement
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
            {/* Afficher le composant Error404 si nécessaire */}
      {renderError404()}
    </>
  );

  // 8. Exporter le composant FicheLogement par défaut
}

export default FicheLogement;


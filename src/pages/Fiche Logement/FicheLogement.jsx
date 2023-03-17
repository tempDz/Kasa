import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import Accordion from "../../components/Accordion/Accordion";
import Data from '../../Data/Data';
import Error404 from "../../pages/Error 404/Error404";
import { FicheLogementContainer, InfoContainer, InfoLogement, InfoTitreLogement, InfoDescriptifLogement, TagsContainer, Tag, RateLogement, NameContainer, Name, Picture, RatingContainer, Rating, AccordionContainer } from './FicheLogement.styles';

// Composant FicheLogement qui affiche les détails d'un logement
function FicheLogement() {
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [apartment, setApartment] = useState(null);
  const [screenSize, setScreenSize] = useState("medium");

  const { id } = useParams();

  // Cherche et récupère les informations de l'appartement en fonction de l'ID dans l'URL
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

  // Gère le redimensionnement de la fenêtre et définit la taille de l'écran en conséquence
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("small");
      } else {
        setScreenSize("medium");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Si l'appartement n'est pas trouvé, affiche la page d'erreur 404
  const renderError404 = () => {
    if (!apartment && searchCompleted) {
      return <Error404 />;
    }
    return null;
  };
  // Rendu du composant FicheLogement avec les détails de l'appartement
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
    {renderError404()}
  </>
);

}

export default FicheLogement;

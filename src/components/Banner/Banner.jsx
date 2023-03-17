import React from "react";
import styled from "styled-components";
import banner from "../../assets/banner.png";
import about from "../../assets/about small.png";
import { useLocation } from "react-router-dom";
import { STYLES } from '../../styles/styles';

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1240px;
  height: 25vh;
  margin: 0 auto;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  background-color: rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 480px) {
    width: 335px;
    height: ${(props) => (props.pathname === "/about" ? "223px" : "111px")};
    border-radius: 10px;
    justify-content: ${(props) =>
      props.pathname === "/about" ? "center" : "flex-start"};
  }
  
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  // filter: brightness(40%);
  opacity: ${props => props.visible ? '0.8' : '0'};
  transition: opacity 0.5s ease-in-out;
`;

const BannerText = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.5s ease-in-out;

  @media screen and (max-width: 480px) {
    width: 217px;
    height: 48px;
    top: 28.04%;
    right: 32.53%;
  } 
`;

const Title = styled.h1`
  font-family: ${STYLES.FONT_FAMILY};
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: min(4vw, 48px);
  line-height: 142.6%;
  color: #ffffff;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 24px;
  } 
`;

// 1. Crée un composant fonctionnel "Banner" qui affiche une bannière en fonction de la route actuelle.
function Banner() {
  
  // 2. Utilise le hook useLocation() pour obtenir l'objet "location" et en extraire la propriété "pathname".
  const { pathname } = useLocation();
  
  // 3. Sélectionne l'image de la bannière en fonction du chemin d'accès.
  const bannerImage = pathname === "/" ? banner : about;
  
  // 4. Utilise le hook useState() pour gérer la visibilité de la bannière.
  const [visible, setVisible] = React.useState(false);
  
  // 5. Crée une fonction callback "onImageLoad" pour gérer l'événement de chargement de l'image de la bannière.
  const onImageLoad = React.useCallback(() => {
    setVisible(true);
  }, []);

  return (
    // 6. Rendu du composant "Banner".
    <BannerContainer pathname={pathname}>
      
      {/*7. Affiche l'image de la bannière en utilisant le composant de style BannerImage.
         Lui passe les propriétés "src", "alt", "visible" et "onLoad". */}
      <BannerImage
        src={bannerImage}
        alt="Banner"
        visible={visible}
        onLoad={onImageLoad}
      />
      
      {/* 8. Affiche le texte de la bannière si le chemin d'accès n'est pas "/about". */}
      {pathname !== "/about" && (
        <BannerText visible={visible}>
          <Title>Chez vous, partout et ailleurs</Title>
        </BannerText>
      )}
    </BannerContainer>
  );
}

export default Banner;

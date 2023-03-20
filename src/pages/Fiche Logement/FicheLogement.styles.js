import styled from "styled-components";
import { COLORS, STYLES } from '../../styles/styles';
import star from '../../assets/star.png';
import starGray from '../../assets/star_gray.png';


const FicheLogementContainer = styled.div`  
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1240px;
  margin: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    }
`;

const InfoLogement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0 20px 0;
  font-family: ${STYLES.FONT_FAMILY};
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  color: ${COLORS.RED};
  line-height: 142.6%;

  @media screen and (max-width: 480px) {
    padding-bottom: 0;
    }
`;

const InfoTitreLogement = styled.div`
  font-size: 36px;
  padding-bottom:20px;
  line-height: 142.6%;
  margin-right: 40px;
  
  @media screen and (max-width: 480px) {
    font-size: 18px;
    }
`;

const InfoDescriptifLogement= styled.div`
  font-size: 18px;
  padding-bottom:20px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
    }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 40px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  font-family: ${STYLES.FONT_FAMILY};
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: 14px;
  line-height: 142.6%;
  color: #FFFFFF;
  background: ${COLORS.RED};
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 5px;

  @media screen and (max-width: 480px) {
    font-size: 10px;
    height: 18px;
    border-radius: 5px;
  }
`;


const RateLogement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 20px 0;

  @media screen and (max-width: 480px) {
    flex-direction: row-reverse;
    }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;

`;

const Name = styled.div`
  font-family: ${STYLES.FONT_FAMILY};
  font-style: normal;
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: 18px;
  line-height: 142.6%;
  color: ${COLORS.RED};

  @media screen and (max-width: 480px) {
    font-size: 12px;
    width: 63px;
    text-align: end;
    }
`;

const Picture = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-left: 20px;

  @media screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
    }

`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarImage = styled.img`
  ${({ theme }) => `
    width: 30px;
    height: 30px;

    @media screen and (max-width: 480px) {
      width: 15px;
      height: 15px;
    }
  `}
`;

const AccordionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 50px 0;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

// Composant Rating qui affiche les étoiles en fonction de la note donnée
const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <>
      {/* Rendu des étoiles pleines en fonction de la valeur de fullStars */}
      {[...Array(fullStars)].map((_, i) => (
        <StarImage
          key={i}
          src={star}
          alt="star"
        />
      ))}
      {/* Rendu des étoiles vides en fonction de la valeur de emptyStars */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarImage
          key={i}
          src={starGray}
          alt="empty star"
        />
      ))}
    </>
  );
};

  export { FicheLogementContainer, InfoContainer, InfoLogement, InfoTitreLogement, InfoDescriptifLogement, TagsContainer, Tag, RateLogement, NameContainer, Name, Picture, RatingContainer, StarImage, Rating, AccordionContainer };
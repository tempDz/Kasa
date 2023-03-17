import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS, STYLES } from '../../styles/styles';

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-family: ${STYLES.FONT_FAMILY};
  color: ${COLORS.RED};
`;

const Text = styled.h1`
  margin: 0;
  font-size: 288px;
  line-height: 142.6%;

  @media screen and (max-width: 768px) {
    font-size: 144px;
  }
`;


const OopsMessage = styled.h2`
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: 36px;
  line-height: 142.6%;
  margin: 0;
  text-align: center; 

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-top: -180px;
  }
`;



const RetourAccueil = styled(Link)`
  font-size: 18px;
  line-height: 142.6%;
  margin-top: 10px; // Modifié pour remonter le lien
  color: ${COLORS.RED};
  text-decoration: none;
  border-bottom: 2px solid ${COLORS.RED};

  &:hover {
    color: ${COLORS.DARK_RED};
    border-bottom: 2px solid ${COLORS.DARK_RED};
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;



function Error404() {
  return (
    <Container>
      <Text>404</Text>
      <OopsMessage>Oups! La page que vous demandez n'existe pas.</OopsMessage>
      <RetourAccueil to="/">Retourner sur la page d’accueil</RetourAccueil>
    </Container>
  );
}

export default Error404;

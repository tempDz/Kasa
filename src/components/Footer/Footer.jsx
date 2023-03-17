import React from 'react';
import styled from 'styled-components';
import logoFooter from '../../assets/LOGO footer.png';
import  { COLORS, STYLES } from '../../styles/styles';

const FooterContainer = styled.div`
  height: 209px;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 375px;
`;

const Logo = styled.img`
  margin-right: auto;
  margin-left: auto;
`;

const Text = styled.p`
  font-family: ${STYLES.FONT_FAMILY};
  font-weight: ${STYLES.FONT_WEIGHT_BOLD};
  font-size: 24px;
  line-height: 34.22px;
  text-align: center;
  color: ${COLORS.WHITE};
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <Logo src={logoFooter} alt="Logo Footer" />
      <Text>© 2022 Kasa. All rights reserved.</Text>
    </FooterContainer>
  );
}

export default Footer;

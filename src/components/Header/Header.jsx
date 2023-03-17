import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/LOGO.svg';
import { STYLES } from '../../styles/styles';

const StyledHeader = styled.div`
width:90%;
max-width:1240px;
align-items: center;
display: flex;
justify-content: space-between;
margin:50px auto;

@media screen and (max-width: 480px){
  padding:5%;
  min-width: 375px;
  margin: 20px auto;
}
`;

const Logo = styled.img`
    align-items: flex-start;
    display: flex;
    margin: 0;
    width: 9rem;
    cursor: pointer;
`;

const Nav = styled.nav`
align-items: center;
display: flex;
justify-content: flex-end;

@media screen and (max-width: 768px) {
  text-transform: uppercase;
}

`;

const StyledLink = styled(NavLink)`
  color: #ff6060;
  font-family: ${STYLES.FONT_FAMILY};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 142.6%;
  padding-left: 0.8rem;
  text-align: right;
  text-decoration: none;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 5rem;
  }

  &.active {
    text-decoration: underline;
    text-decoration-color: #FF6060;
  }

  &:hover {
    text-decoration: underline;
    text-decoration-color: #FF6060;
  }

  @media screen and (max-width: 768px) {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Logo src={logo} alt="Logo" onClick={() => navigate('/')} />
      <Nav>
        <StyledLink to="/"> {/* Remove exact={true} from here */}
          Accueil
        </StyledLink>
        <StyledLink to="/about">A propos</StyledLink>
      </Nav>
    </StyledHeader>
  );
};


export default Header;

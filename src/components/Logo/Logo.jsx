import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/LOGO.svg';

const StyledLogo = styled.img

function Logo() {
  return (
    <Link to="/">
      <StyledLogo src={logo} alt="Logo" />
    </Link>
  );
}

export default Logo;

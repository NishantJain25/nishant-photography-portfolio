import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 128px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
`;
const NavSectionContainer = styled.div`
  display: flex;
  justify-content: ${props =>
    props.$layout === "center"
      ? "center"
      : props.$layout === "right"
      ? "flex-end"
      : "flex-start"};
  flex: 1;
  align-items: center;
`;
const NavItemsContainer = styled.div`
  display: flex;
  gap: 50px;
  cursor: pointer;
`;
const NavItem = styled(Link)`
position: relative;
&::before{
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  transition: 0.2s all ease-out;
}
&:hover::before{
  border-left: 1px solid black;
  border-right: 1px solid black;
  transform: scaleX(1.2);
}`;
const CtaBtn = styled.button`
  border: 1px solid black;
  background: none;
  padding: 8px 16px;
`;
const Logo = styled.div``;

const Navbar = () => {
  return (
    <Container>
      <NavSectionContainer $layout="left">
        <Logo>Nishant Jain.</Logo>
      </NavSectionContainer>
      <NavSectionContainer $layout="center">
        <NavItemsContainer>
          <NavItem to={""}>About</NavItem>
          <NavItem to={"/gallery"}>Gallery</NavItem>
          <NavItem>Services</NavItem>
        </NavItemsContainer>
      </NavSectionContainer>
      <NavSectionContainer $layout="right">
        <CtaBtn><span>Let's Talk</span></CtaBtn>
      </NavSectionContainer>
    </Container>
  );
};

export default Navbar;

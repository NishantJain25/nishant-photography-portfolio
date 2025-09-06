import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaInstagram, FaBehance } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 24px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: black;
`;
const NavSectionContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$layout === "center"
      ? "center"
      : props.$layout === "right"
      ? "flex-end"
      : "flex-start"};
  flex: 1;
  align-items: center;
  gap: 8px;
`;
const NavItemsContainer = styled.div`
  display: flex;
  gap: 50px;
  cursor: pointer;
`;
const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
`;
const CtaBtn = styled.button`
  border: 1px solid white;
  border-radius: 50px;
  background: none;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
`;
const IconBtn = styled.button`
  border: none;
  background: none;
  padding: 4px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s all 

  &:hover {
    scale: 0.9;
  }
`;
const Logo = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <NavSectionContainer $layout="left">
        <Logo>N.</Logo>
      </NavSectionContainer>
      <NavSectionContainer $layout="center">
        <NavItemsContainer>
          <NavItem to={""}>About</NavItem>
          <NavItem to={"/gallery"}>Gallery</NavItem>
          <NavItem to={"/projects"}>Projects</NavItem>
        </NavItemsContainer>
      </NavSectionContainer>
      <NavSectionContainer $layout="right">
        <IconBtn>
          <FaInstagram size={20} />
        </IconBtn>
        <IconBtn>
          {" "}
          <FaBehance size={20} />{" "}
        </IconBtn>
        <CtaBtn>
          <span>Let's Talk</span>
        </CtaBtn>
      </NavSectionContainer>
    </Container>
  );
};

export default Navbar;

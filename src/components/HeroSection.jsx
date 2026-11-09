import React from "react";
import { Section, SectionContainer } from "./StyledComponents";
import styled from "styled-components";
import HeroImage from "../assets/gallery/profile_yellow.webp";

const Heading = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  font-size: 14vw;
  letter-spacing: var(--letter-spacing-tighter);
  font-weight: var(--font-weight-regular);
  color: white;
  margin: 0;
  line-height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const ImageContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 50vh;
  overflow: hidden;
`;

const HeroSection = () => {
  return (
    <Section data-scroll-section id="hero">
      <SectionContainer>
        <ImageContainer>
          <img
            src={HeroImage}
            alt="Nishant Jain, photographer"
            fetchPriority="high"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </ImageContainer>
        <TitleContainer>
          <Heading>NISHANT</Heading>
          <Heading>JAIN</Heading>
        </TitleContainer>
      </SectionContainer>
    </Section>
  );
};

export default HeroSection;

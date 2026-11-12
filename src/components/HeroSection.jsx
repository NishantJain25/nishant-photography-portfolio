import React from "react";
import { Section, SectionContainer } from "./StyledComponents";
import styled from "styled-components";
import HeroImage from "../assets/gallery/profile_yellow.webp";

// Stops the fixed navbar covering the photo when the content fills the screen.
const HeroContainer = styled(SectionContainer)`
  @media (max-width: 768px), (max-height: 600px) {
    padding-top: calc(var(--section-spacing) + var(--spacing-10));
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  font-size: 12vw;
  font-size: 15.5cqw;
  letter-spacing: var(--letter-spacing-tighter);
  font-weight: var(--font-weight-normal);
  color: white;
  margin: 0;
  line-height: 100%;
`;

// Sized to this box instead of the screen, so the name always spans it exactly.
// It's the home page's main heading, so it's an h1 for search engines.
const TitleContainer = styled.h1`
  margin: 0;
  container-type: inline-size;
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

  /* A fixed shape, since a share of the screen height can come out nearly square. */
  @media (max-width: 600px) {
    height: auto;
    aspect-ratio: 3 / 4;
  }
`;

const HeroSection = () => {
  return (
    <Section data-scroll-section id="hero">
      <HeroContainer>
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
      </HeroContainer>
    </Section>
  );
};

export default HeroSection;

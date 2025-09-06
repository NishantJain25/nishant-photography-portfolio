import React from "react";
import { Section } from "./StyledComponents";
import styled from "styled-components";

const Title = styled.h1`
  color: black;
  font-size: 5rem;
`;

const HeroSection = () => {
  return (
    <Section data-scroll-section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        data-scroll
      >
        <Title data-scroll>Nishant Jain</Title>
      </div>
    </Section>
  );
};

export default HeroSection;

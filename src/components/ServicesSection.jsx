import React from "react";
import { Section, SectionContainer, SectionTitle } from "./StyledComponents";
import { styled } from "styled-components";

const ServicesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  justify-content: center;
`;
const ServicesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const ServiceTitle = styled.p`
  margin: 0;
  font-size: 48px;
  cursor: pointer;
`;

const ServicesSection = () => {
  return (
    <Section data-scroll-section>
      <SectionContainer>
        <SectionTitle data-scroll>Services</SectionTitle>
        <ServicesListContainer>
          <ServiceTitle>Portraits</ServiceTitle>
          <ServiceTitle>Food</ServiceTitle>
          <ServiceTitle>Product</ServiceTitle>
          <ServiceTitle>Event</ServiceTitle>
        </ServicesListContainer>
      </SectionContainer>
    </Section>
  );
};

export default ServicesSection;

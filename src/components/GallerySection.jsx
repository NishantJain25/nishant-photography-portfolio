import React from 'react'
import { Section, SectionContainer, SectionTitle } from './StyledComponents'
import { styled } from 'styled-components';


const Image = styled.div`
  height: 400px;
  width: 300px;
  background-color: grey;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  box-shadow: 0px 0px 5px rgb(73, 73, 73);
  transition: all 0.75s cubic-bezier(0.13, 0.86, 0.26, 1);
`;

const GallerySection = () => {
  return (
    <Section data-scroll-section>
        <SectionContainer>
          <SectionTitle data-scroll>Gallery</SectionTitle>
          
        </SectionContainer>
      </Section>
  )
}

export default GallerySection

import React from 'react'
import { Section } from './StyledComponents'

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
          <div data-scroll>Nishant Jain</div>
        </div>
      </Section>
  )
}

export default HeroSection

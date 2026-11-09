import { Section } from "./StyledComponents";
import { styled } from "styled-components";
import Profile from "../assets/gallery/profile_bnw.webp";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useSite from "../context/siteContext";


// Grow past one screen when the copy needs more room.
const AboutSection = styled(Section)`
  height: auto;
  min-height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
  min-height: 100vh;
  padding: 48px 24px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-sizing: border-box;
    border: 1px solid var(--color-neutral-700);
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
`;

const Eyebrow = styled.p`
  margin: 0;
  color: var(--color-neutral-400);
  font-size: var(--font-size-lg);
`;

const Headline = styled.h2`
  margin: 0;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-medium);
  line-height: 1.1;
  letter-spacing: var(--letter-spacing-tighter);
  color: var(--color-neutral-50);
`;

const Body = styled.p`
  margin: 0;
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-300);
`;

const SignOff = styled.p`
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-neutral-50);
`;

const ServicesBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-neutral-700);
`;

const ServicesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  color: var(--color-neutral-50);

  li {
    padding: var(--spacing-2) var(--spacing-4);
    border: 1px solid var(--color-neutral-600);
    border-radius: 50px;
    white-space: nowrap;
  }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
  flex-wrap: wrap;
  margin-top: var(--spacing-4);
`;

const CtaNote = styled.span`
  color: var(--color-neutral-400);
`;

const ServicesSection = () => {
  const navigate = useNavigate();
  const { categories } = useSite();

  return (
    <AboutSection data-scroll-section id="services">
      <Container>
        <LeftSection>
          <img src={Profile} alt="Nishant Jain" loading="lazy" />
        </LeftSection>
        <RightSection>
          <TextContainer>
            <Headline>
              It started with a borrowed camera and a habit of noticing things.
            </Headline>
            <Body>
              Years later, I'm still chasing that same feeling: the split second
              when a laugh breaks or the light lands just right. Today I
              photograph people, places and celebrations for clients who want
              images that feel lived-in, not staged.
            </Body>
            <SignOff>I'm Nishant. Nice to meet you.</SignOff>

            <ServicesBlock>
              <Eyebrow>What I shoot</Eyebrow>
              <ServicesList>
                {categories.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ServicesList>
              <CtaRow>
                <Button text="Gallery" onClick={() => navigate("/gallery")} />
                <CtaNote>Browse the full collection, shoot by shoot.</CtaNote>
              </CtaRow>
            </ServicesBlock>
          </TextContainer>
        </RightSection>
      </Container>
    </AboutSection>
  );
};

export default ServicesSection;

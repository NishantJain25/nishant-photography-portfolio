import React, { useState } from "react";
import {
  Divider,
  Row,
  Section,
  SectionRowContainer,
} from "./StyledComponents";
import { styled } from "styled-components";
import { FaRegEnvelope, FaRegCopy } from "react-icons/fa";
import Button from "./Button";
import { SOCIAL_ICONS } from "../constants/socialIcons";
import useSite from "../context/siteContext";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-5);
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  height: 35px;
  outline: none;

  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const InputLabel = styled.label`
  color: var(--color-neutral-400);
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;

const IconBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--color-neutral-50);
  background-color: none;
  color: white;
  cursor: pointer;
  transition: all 0.5s var(--transition-cubic-bezier);

  &:hover {
    background-color: var(--color-neutral-50);
    color: black;
    scale: 0.9;
  }

  &:active {
    scale: 0.8;
  }
`;

const EmailContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const EmailText = styled.h3`
  margin: 0;
  cursor: pointer;
  transition: text-decoration 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const EmailPortal = styled.div`
  position: absolute;
  ${({ position }) =>
    position === "top"
      ? `bottom: calc(100% + 12px); top: auto;`
      : `top: calc(100% + 12px); bottom: auto;`}
  left: 0;
  background-color: black;
  border: 1px solid var(--color-neutral-700);
  padding: 0;
  min-width: 150px;
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transform: translateY(
    ${({ isVisible, position }) =>
      isVisible ? "0" : position === "top" ? "10px" : "-10px"}
  );
  transition: all 0.5s var(--transition-cubic-bezier) 0.5s;
`;

const PortalOption = styled.div`
  padding: 16px;
  cursor: pointer;
  color: var(--color-neutral-50);
  font-size: var(--font-size-sm);
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  &:hover {
    background-color: var(--color-neutral-700);
  }
  &:first-child {
    border-bottom: 1px solid var(--color-neutral-700);
  }
`;

const CtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
`;

const Eyebrow = styled.p`
  margin: 0;
  color: var(--color-neutral-400);
  font-size: var(--font-size-lg);
`;

const CtaHeadline = styled.h2`
  margin: 0;
  font-size: var(--font-size-7xl);
  font-weight: var(--font-weight-medium);
  line-height: 1.05;
  letter-spacing: var(--letter-spacing-tighter);
  color: var(--color-neutral-50);
`;

const CtaAccent = styled.a`
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.15em;
  white-space: nowrap;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-neutral-400);
  }
`;

const IconWrapper = styled.div`
  color: var(--color-neutral-400);
  display: flex;
  align-items: center;
`;

const ContactSection = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [portalPosition, setPortalPosition] = useState("bottom");
  const { settings } = useSite();
  const email = settings?.email;
  const emailContainerRef = React.useRef(null);

  const calculatePortalPosition = () => {
    if (!emailContainerRef.current) return "bottom";

    const container = emailContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - containerRect.bottom;
    const portalHeight = 80; // Estimated portal height

    return spaceBelow < portalHeight + 20 ? "top" : "bottom";
  };

  const handleEmailHover = () => {
    setPortalPosition(calculatePortalPosition());
    setIsPortalVisible(true);
  };

  const handleEmailLeave = () => {
    setIsPortalVisible(false);
    setCopySuccess(false);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Clipboard access was denied, so the label just stays "Copy email".
    }
  };

  const handleOpenEmailClient = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Section data-scroll-section id="contact">
      <SectionRowContainer>
        <CtaBlock>
          <Eyebrow>Have a shoot in mind?</Eyebrow>
          <CtaHeadline>
            Let's make something{" "}
            <CtaAccent href={email ? `mailto:${email}` : undefined}>
              together →
            </CtaAccent>
          </CtaHeadline>
          {email && (
            <Column>
              <InputLabel>Email Address</InputLabel>
              <EmailContainer
                ref={emailContainerRef}
                onMouseEnter={handleEmailHover}
                onMouseLeave={handleEmailLeave}
              >
                <EmailText>{email}</EmailText>
                <EmailPortal
                  isVisible={isPortalVisible}
                  position={portalPosition}
                >
                  <PortalOption onClick={handleCopyEmail}>
                    <IconWrapper>
                      <FaRegCopy />
                    </IconWrapper>
                    {copySuccess ? "Copied!" : "Copy email"}
                  </PortalOption>
                  <PortalOption onClick={handleOpenEmailClient}>
                    <IconWrapper>
                      <FaRegEnvelope />
                    </IconWrapper>
                    Open email client
                  </PortalOption>
                </EmailPortal>
              </EmailContainer>
            </Column>
          )}
        </CtaBlock>
        <FormContainer>
          <div>
            <InputLabel for={"email"}>Your email</InputLabel>
            <StyledInput name={"email"} />
          </div>
          <div>
            <InputLabel for="message">Message</InputLabel>
            <StyledInput name="message" />
          </div>
          <div>
            <Button text={"Submit"} />
          </div>
          <Divider />
          <Column>
            <Column>
              <InputLabel>Socials</InputLabel>
              <Row gap={2}>
                {settings?.socialLinks.map(({ id, platform, url }) => {
                  const Icon = SOCIAL_ICONS[platform];
                  return (
                    <IconBtn
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                    >
                      {Icon && <Icon />}
                    </IconBtn>
                  );
                })}
              </Row>
            </Column>
          </Column>
        </FormContainer>
      </SectionRowContainer>
    </Section>
  );
};

export default ContactSection;

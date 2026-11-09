import React, { useEffect, useState } from "react";
import {
  Divider,
  Row,
  Section,
  SectionRowContainer,
} from "./StyledComponents";
import { styled } from "styled-components";
import { FaRegEnvelope, FaRegCopy } from "react-icons/fa";
import Button from "./Button";
import { HoverMenu, HoverMenuIcon, HoverMenuOption } from "./HoverMenu";
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
  font: inherit;
  outline: none;

  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const StyledTextarea = styled(StyledInput).attrs({ as: "textarea" })`
  height: auto;
  padding: var(--spacing-2) 0;
  resize: none;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
`;

// The fixed height stops the page jumping when a message appears or vanishes.
const FormMessage = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  min-height: 24px;
  font-size: var(--font-size-sm);
  color: ${({ $isError }) =>
    $isError ? "var(--color-error)" : "var(--color-neutral-400)"};
`;

const DismissButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font-size: var(--font-size-xl);
  line-height: 1;
  cursor: pointer;
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
  overflow-wrap: anywhere;
  cursor: pointer;
  transition: text-decoration 0.3s ease;

  &:hover {
    text-decoration: underline;
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

const ContactSection = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [portalPosition, setPortalPosition] = useState("bottom");
  const [formStatus, setFormStatus] = useState("idle");
  const { settings } = useSite();
  const email = settings?.email;
  const emailContainerRef = React.useRef(null);

  // Errors stay until closed, since they tell the visitor what to do next.
  useEffect(() => {
    if (formStatus !== "sent") return;
    const timer = setTimeout(() => setFormStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [formStatus]);

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

  // Netlify picks up form posts sent to the site root.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error("Form post failed");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
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
                <HoverMenu isVisible={isPortalVisible} position={portalPosition}>
                  <HoverMenuOption onClick={handleCopyEmail}>
                    <HoverMenuIcon>
                      <FaRegCopy />
                    </HoverMenuIcon>
                    {copySuccess ? "Copied!" : "Copy email"}
                  </HoverMenuOption>
                  <HoverMenuOption onClick={handleOpenEmailClient}>
                    <HoverMenuIcon>
                      <FaRegEnvelope />
                    </HoverMenuIcon>
                    Open email client
                  </HoverMenuOption>
                </HoverMenu>
              </EmailContainer>
            </Column>
          )}
        </CtaBlock>
        <FormContainer>
          <ContactForm name="contact" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            {/* Spam trap: hidden from people, and Netlify drops anything that fills it. */}
            <input name="company" tabIndex={-1} autoComplete="off" hidden />
            <div>
              <InputLabel htmlFor="contact-email">Your email</InputLabel>
              <StyledInput
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <InputLabel htmlFor="contact-message">Message</InputLabel>
              <StyledTextarea
                id="contact-message"
                name="message"
                rows={3}
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                text={formStatus === "sending" ? "Sending..." : "Submit"}
                disabled={formStatus === "sending"}
              />
            </div>
            <FormMessage role="status" $isError={formStatus === "error"}>
              {formStatus === "sent" && "Thanks! I'll get back to you soon."}
              {formStatus === "error" && (
                <>
                  That didn't send. Please email me directly instead.
                  <DismissButton
                    type="button"
                    aria-label="Dismiss message"
                    onClick={() => setFormStatus("idle")}
                  >
                    &times;
                  </DismissButton>
                </>
              )}
            </FormMessage>
          </ContactForm>
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

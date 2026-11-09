import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import usePage from "../context/pageContext";
import useSite from "../context/siteContext";

const FooterContainer = styled.footer`
  width: calc(100% - 2 * var(--page-gutter));
  box-sizing: border-box;
  margin: 0 var(--page-gutter);
  border: 1px solid var(--color-neutral-700);
  border-top: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Cell = styled.div`
  min-width: 0;
  padding: var(--spacing-8) var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  border-right: 1px solid var(--color-neutral-700);

  &:last-child {
    border-right: none;
  }

  /* Name and email get full rows, with the two link lists side by side between. */
  @media (max-width: 768px) {
    padding: var(--spacing-6) var(--page-gutter);

    &:first-child,
    &:last-child {
      grid-column: 1 / -1;
      border-right: none;
    }
    &:nth-child(3) {
      border-right: none;
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-neutral-700);
    }
  }
`;

const Name = styled.p`
  margin: 0;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-neutral-50);
`;

const Label = styled.p`
  margin: 0 0 var(--spacing-1);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
`;

const Muted = styled.p`
  margin: 0;
  color: var(--color-neutral-400);
`;

const linkStyles = `
  color: var(--color-neutral-50);
  text-decoration: none;
  width: fit-content;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-neutral-400);
  }
`;

const FooterLink = styled(Link)`
  ${linkStyles}
`;

const ExternalLink = styled.a`
  ${linkStyles}
  overflow-wrap: anywhere;
`;

const BottomRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-2) var(--spacing-4);
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-neutral-700);
  color: var(--color-neutral-400);
  font-size: var(--font-size-sm);
`;

const BackToTop = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--color-neutral-400);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-neutral-50);
  }
`;

const Footer = () => {
  const { lenis } = usePage();
  const { settings } = useSite();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    // Wait for the home page to render when navigating from another route.
    setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;
      if (lenis) lenis.scrollTo(section);
      else section.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <FooterContainer>
      <Grid>
        <Cell>
          {settings && (
            <>
              <Name>{settings.name}</Name>
              <Muted>
                {settings.tagline} · {settings.location}
              </Muted>
            </>
          )}
        </Cell>

        <Cell as="nav" aria-label="Footer">
          <Label>Navigate</Label>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/projects">My Works</FooterLink>
          <FooterLink to="/" onClick={() => scrollToSection("services")}>
            Services
          </FooterLink>
          <FooterLink to="/" onClick={() => scrollToSection("contact")}>
            Contact
          </FooterLink>
        </Cell>

        <Cell>
          <Label>Follow</Label>
          {settings?.socialLinks.map(({ id, platform, url }) => (
            <ExternalLink
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform}
            </ExternalLink>
          ))}
        </Cell>

        <Cell>
          <Label>Say hello</Label>
          {settings?.email && (
            <ExternalLink href={`mailto:${settings.email}`}>
              {settings.email}
            </ExternalLink>
          )}
        </Cell>
      </Grid>

      <BottomRow>
        <span>
          © {year} {settings?.name}. All rights reserved.
        </span>
        <BackToTop type="button" onClick={scrollToTop}>
          Back to top ↑
        </BackToTop>
      </BottomRow>
    </FooterContainer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Seo from "../components/Seo";
import {
  HeaderText,
  PageContainer,
  SectionContainer,
  StatusMessage,
} from "../components/StyledComponents";

const HomeLink = styled(Link)`
  color: var(--color-neutral-50);
  text-decoration: underline;

  &:hover {
    color: var(--color-neutral-400);
  }
`;

// Shown for any address that doesn't match a page. noindex keeps search engines
// from listing these, since Netlify answers every URL with the same page.
const NotFound = () => (
  <PageContainer>
    <Seo title="Page not found | Nishant Jain Photography" noindex />
    <SectionContainer>
      <HeaderText as="h1">Page not found</HeaderText>
      <StatusMessage>
        This page doesn't exist. <HomeLink to="/">Go to the home page</HomeLink>
      </StatusMessage>
    </SectionContainer>
  </PageContainer>
);

export default NotFound;

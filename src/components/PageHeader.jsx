import React from "react";
import { styled } from "styled-components";
import { Header, HeaderText, HeaderTextContainer } from "./StyledComponents";
import Filter from "./Filter";

const ItemCount = styled.span`
  font-size: var(--font-size-xl);
  color: var(--color-neutral-400);
`;

const PageHeader = ({
  title,
  itemCount,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Header id="header">
      <HeaderTextContainer id="header-text-container">
        <HeaderText>{title}</HeaderText>
        {itemCount > 0 && <ItemCount>[{itemCount}]</ItemCount>}
      </HeaderTextContainer>
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </Header>
  );
};

export default PageHeader;

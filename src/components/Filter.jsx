import React from "react";
import { styled } from "styled-components";

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px 4px;
  width: 30%;
  z-index: 10;
  background-color: rgba(250 250 250, 0.9);
  backdrop-filter: blur(10px);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-base);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Category = styled.span`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  cursor: pointer;
  transition: all 0.3s ease-out;
  color: ${({ isSelected }) =>
    isSelected ? "var(--color-neutral-50)" : "var(--color-neutral-500)"};
  line-height: var(--line-height-tight);
  &:hover {
    color: var(--color-neutral-200);
  }
`;

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <CategoryContainer>
      {categories.map((category, i) => (
        <Category
          key={category}
          isSelected={category === selectedCategory}
          onClick={() => onCategoryChange(category)}
        >
          {category}
          {i !== categories.length - 1 && ", "}
        </Category>
      ))}
    </CategoryContainer>
  );
};

export default Filter;

import { styled } from "styled-components";

// A small popup of options. Place it inside a `position: relative` element.
export const HoverMenu = styled.div`
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

export const HoverMenuOption = styled.div`
  padding: 16px;
  cursor: pointer;
  color: var(--color-neutral-50);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  &:hover {
    color: var(--color-neutral-50);
    background-color: var(--color-neutral-700);
  }
  &:first-child {
    border-bottom: 1px solid var(--color-neutral-700);
  }
`;

export const HoverMenuIcon = styled.div`
  color: var(--color-neutral-400);
  display: flex;
  align-items: center;
`;

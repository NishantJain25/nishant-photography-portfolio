import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import styled from "styled-components";

const SubmitButton = styled.button`
  color: var(--color-neutral-50);
  border-radius: 50px;
  height: 50px;
  background-color: white;
  color: black;
  border: none;
  width: 100%;
  padding: 0 36px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  transition: all 0.5s var(--transition-cubic-bezier);
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitText = styled.span`
  position: relative;
  z-index: 2;
  font-size: var(--font-size-lg);
  white-space: nowrap;
`;

const IconElement = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 75px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  z-index: 0;
  transition: all 0.5s var(--transition-cubic-bezier);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: var(--font-size-lg);
  font-weight: bold;
  z-index: 0;
`;

// An invisible copy of the label sets the container's width, leaving room for
// the arrow. The button can then shrink on hover without moving what's around it.
const WidthSizer = styled.span`
  display: block;
  box-sizing: border-box;
  min-width: 150px;
  padding: 0 60px 0 24px;
  font-size: var(--font-size-lg);
  line-height: 50px;
  white-space: nowrap;
  visibility: hidden;
`;

const SubmitButtonContainer = styled.div`
  width: fit-content;
  height: 50px;
  position: relative;
  cursor: pointer;

  &:hover {
    ${SubmitButton} {
      width: calc(100% - 36px);
      padding-right: 0px;
    }

    ${IconElement} {
      width: 50px;
      right: -55px;
    }
  }
  &:active {
    ${IconElement} {
      right: -75px;
    }
  }
`;

const Button = ({ text, Icon, onClick, type = "button", disabled = false }) => {
  return (
    <SubmitButtonContainer onClick={onClick}>
      <WidthSizer aria-hidden="true">{text}</WidthSizer>
      <SubmitButton type={type} disabled={disabled}>
        <SubmitText>{text}</SubmitText>

        <IconElement>{Icon ?? <HiArrowRight />}</IconElement>
      </SubmitButton>
    </SubmitButtonContainer>
  );
};

export default Button;

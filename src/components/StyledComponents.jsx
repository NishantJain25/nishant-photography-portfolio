import { styled } from "styled-components";

export const Section = styled.section`
  height: 100vh;
  box-sizing: border-box;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  border: 2px solid red;
`;

export const SectionTitle = styled.p`
  font-size: 24px;
`;

export const Circle = styled.button`
  height: 50px;
  width: 50px;
  background-color: transparent;
  border: 3px solid ${(props) => (props.light ? "white" : "black")};
  border-radius: 50%;
  color: ${(props) => (props.light ? "white" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  transition: all 0.3s ease-out;
  scale: ${(props) => props.scale};
`;

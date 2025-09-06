import { styled } from "styled-components";

export const Section = styled.section`
  height: 100vh;
  box-sizing: border-box;
  border: 2px solid green;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px solid red;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const SectionTitle = styled.p`
  font-size: 24px;
  margin: 0;
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

export const HeaderText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 112px;
  text-align: left;
  color: white;
`;

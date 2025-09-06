import React from "react";
import { HeaderText } from "../components/StyledComponents";
import { styled } from "styled-components";

const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
`;

const Projects = () => {
  return (
    <Container data-scroll-section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0px 24px",
          boxSizing: "border-box",
          gap: "48px",
          width: "100%",
        }}
      >
        <HeaderText>Projects</HeaderText>
      </div>
    </Container>
  );
};

export default Projects;

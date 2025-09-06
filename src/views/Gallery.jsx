import React from "react";
import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import { LiaFilterSolid } from "react-icons/lia";
import { Circle, HeaderText } from "../components/StyledComponents";

const Image = styled.img`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  height: auto;
  max-width: 500px;
  object-fit: contain;
  box-sizing: border-box;
`;
const ImageGridWrapper = styled.div`
  display: inline-block;
  column-count: 4;
  width: 100%;
  box-sizing: border-box;
`;
const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Gallery = () => {
  const [open, setIsOpen] = React.useState(true);
  const images = [
    "desert.jpeg",
    "hero_shot.jpeg",
    "profile_bnw.jpg",
    "profile_cliff.jpg",
    "profile_coffee.jpg",
    "profile_professional.jpg",
    "desert.jpeg",
    "hero_shot.jpeg",
    "desert.jpeg",
    "hero_shot.jpeg",
    "profile_bnw.jpg",
    "profile_cliff.jpg",
    "profile_coffee.jpg",
    "profile_professional.jpg",
    "desert.jpeg",
    "hero_shot.jpeg",
  ];

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
        <Header>
          <HeaderText>Gallery</HeaderText>
        </Header>
        <ImageGridWrapper filterOpen={open}>
          {images.map((image, key) => (
            <Image src={require(`../assets/gallery/${image}`)} key={key} />
          ))}
        </ImageGridWrapper>
      </div>
    </Container>
  );
};

export default Gallery;

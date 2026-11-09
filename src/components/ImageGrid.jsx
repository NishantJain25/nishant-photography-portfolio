import React, { useState } from "react";
import { styled } from "styled-components";
import { ImageGridWrapper } from "./StyledComponents";
import ImageModal from "./ImageModal";
import { imageSize, imageUrl } from "../sanity/client";

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  transition: transform 1s var(--transition-cubic-bezier);
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid;
  overflow: hidden;
  border: 1px solid var(--color-neutral-700);
`;

// `images` items look like { id, image, alt?, caption?, title?, category?, project? },
// where `image` is the Sanity image object.
const ImageGrid = ({
  images,
  modalContent = null,
  onImageClick = null,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (onImageClick) {
      onImageClick(image);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ImageGridWrapper>
        {images.map((image) => (
          <ImageContainer key={image.id}>
            <Image
              onClick={() => handleImageClick(image)}
              src={imageUrl(image.image, 1000)}
              alt={image.alt || image.caption || image.title || ""}
              loading="lazy"
              {...imageSize(image.image)}
            />
          </ImageContainer>
        ))}
      </ImageGridWrapper>
      <ImageModal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        image={selectedImage}
        modalContent={modalContent}
      />
    </>
  );
};

export default ImageGrid;

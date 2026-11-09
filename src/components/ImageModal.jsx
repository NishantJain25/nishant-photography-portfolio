import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InfoGrid from "./InfoGrid";
import Modal from "./Modal";
import { imageUrl } from "../sanity/client";
import { formatDate } from "../util/formatDate";

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 8px;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  color: var(--color-neutral-50);
  text-align: left;
  gap: 16px;
`;

const ButtonRow = styled.div`
  align-self: flex-end;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
`;

const ImageView = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $hasDetails }) =>
    $hasDetails ? "3fr 2fr" : "1fr"};
  background-color: transparent;
  gap: var(--spacing-16);
`;

const ImageViewContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImageModal = ({ isOpen, onClose, image, modalContent = null }) => {
  const navigate = useNavigate();

  if (!image) return null;

  const { title, category, caption, project, date } = image;

  const viewProject = () => {
    onClose();
    navigate(`/projects/${project.slug}`);
  };

  const infoRows = [
    { label: "Project", value: project?.title },
    { label: "Category", value: category },
    { label: "Date", value: date && formatDate(date) },
  ];
  const hasInfo = infoRows.some(({ value }) => value);
  const hasDetails = modalContent || title || caption || hasInfo;

  const defaultContent = (
    <TextContainer>
      {title && <Title>{title}</Title>}
      {caption && <Description>{caption}</Description>}
      {hasInfo && <InfoGrid rows={infoRows} />}
      {project && (
        <ButtonRow>
          <Button text="View Project" onClick={viewProject} />
        </ButtonRow>
      )}
    </TextContainer>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      renderContent={
        <ImageView $hasDetails={Boolean(hasDetails)}>
          <ImageViewContainer>
            <ModalImage
              src={imageUrl(image.image, 2000)}
              alt={image.alt || caption || title || ""}
            />
          </ImageViewContainer>
          {modalContent || (hasDetails && defaultContent)}
        </ImageView>
      }
    />
  );
};

export default ImageModal;

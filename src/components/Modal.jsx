import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  opacity: 1;
  height: 100%;
  width: 100%;
  background-color: transparent;
  padding: var(--spacing-12);
  z-index: 1001;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  padding: 0;
  border: 0;
  font-size: 48px;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, renderContent }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <ModalContainer>
      <Overlay onClick={onClose} />
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {renderContent}
      </ModalContent>
    </ModalContainer>,
    document.getElementById("root")
  );
};

export default Modal;

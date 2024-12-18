import { ReactNode } from "react";
import Modal, { Styles } from "react-modal";
import "../../css/Modal.css";

type ModalElementProps = {
  children: ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
};

const ModalElement = ({
  children,
  isModalOpen,
  closeModal,
}: ModalElementProps) => {
  const customStyles: Styles = {
    content: {
      margin: "auto",
      height: "75%",
      border: "1px solid #ccc",
      width: "40%",
      background: "#fff",
      overflow: "auto",
      borderRadius: "5px",
      outline: "none",
      padding: "0",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(40, 40, 40, 0.80)",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
};

export default ModalElement;

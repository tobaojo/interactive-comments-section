import { ReactNode } from "react";
import Modal from "react-modal";

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
  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
      {children}
    </Modal>
  );
};

export default ModalElement;

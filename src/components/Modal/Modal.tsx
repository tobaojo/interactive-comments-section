import { ReactNode } from "react";
import Modal from "react-modal";
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
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="self-center mx-auto h-auto w-11/12 border border-gray-300 bg-white overflow-auto rounded-lg outline-none p-0 md:w-1/4"
      overlayClassName="flex fixed inset-0 bg-black bg-opacity-80 justify-center items-center"
    >
      {children}
    </Modal>
  );
};

export default ModalElement;

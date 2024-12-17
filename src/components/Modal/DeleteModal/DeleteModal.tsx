import { ReactNode } from "react";
import ModalElement from "../Modal";
import { Comment } from "../../../types/types";

type DeleteModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
  handleDeleteClick: (comment: Comment) => void;
};

const DeleteModal = ({
  children,
  isModalOpen,
  closeModal,
  handleDeleteClick,
}: DeleteModalProps) => {
  return (
    <ModalElement isModalOpen={isModalOpen} closeModal={closeModal}>
      {children}
    </ModalElement>
  );
};

export default DeleteModal;

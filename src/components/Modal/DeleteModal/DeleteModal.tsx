import { ReactNode } from "react";
import ModalElement from "../Modal";
import { Comment } from "../../../types/types";

type DeleteModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
  handleDeleteClick: (comment: Comment, deletedReply?: Comment) => void;
};

const DeleteModal = ({
  children,
  isModalOpen,
  closeModal,
}: DeleteModalProps) => {
  return (
    <ModalElement isModalOpen={isModalOpen} closeModal={closeModal}>
      {children}
    </ModalElement>
  );
};

export default DeleteModal;

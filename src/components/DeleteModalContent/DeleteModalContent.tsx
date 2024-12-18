import { Comment } from "../../types/types";

type DeleteModalContentProps = {
  handleDeleteClick: (comment: Comment, deletedReply?: Comment) => void;
  comment: Comment;
  closeModal: () => void;
  deletedReply?: Comment;
};

const DeleteModalContent = ({
  handleDeleteClick,
  comment,
  closeModal,
  deletedReply,
}: DeleteModalContentProps) => {
  return (
    <div>
      <h2>Delete Comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone
      </p>
      <button onClick={closeModal}>NO, CANCEL</button>
      {deletedReply && (
        <button onClick={() => handleDeleteClick(comment, deletedReply)}>
          YES, DELETE
        </button>
      )}
    </div>
  );
};

export default DeleteModalContent;

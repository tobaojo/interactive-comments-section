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
    <div className="p-6 flex flex-col space-y-2">
      <h2 className="text-darkBlue font-semibold mb-3 text-xl">
        Delete Comment
      </h2>
      <p className="leading-6 text-grayishBlue mx-auto">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone
      </p>
      <div className="flex flex-row space-x-4 items-center justify-center">
        <button
          onClick={closeModal}
          className="bg-grayishBlue p-4 rounded-lg text-lightGray"
        >
          NO, CANCEL
        </button>

        <button
          className="bg-softRed p-4 rounded-lg text-lightGray"
          onClick={() => handleDeleteClick(comment, deletedReply)}
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
};

export default DeleteModalContent;

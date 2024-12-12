import DeleteIcon from "../Icons/DeleteIcon";

type DeleteButtonProps = {
  onHandleClick: () => void;
};

const DeleteButton = ({ onHandleClick }: DeleteButtonProps) => {
  return (
    <button
      className="flex space-x-1 items-center p-1 hover:opacity-50"
      onClick={onHandleClick}
    >
      <DeleteIcon />
      <span className="font-semibold text-softRed">Delete</span>
    </button>
  );
};

export default DeleteButton;

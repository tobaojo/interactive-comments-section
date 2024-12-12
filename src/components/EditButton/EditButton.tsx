import EditIcon from "../Icons/EditIcon";

type EditButtonProps = {
  onHandleClick: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
};

const EditButton = ({ onHandleClick, isEditing }: EditButtonProps) => {
  return (
    <button
      className="flex space-x-1 items-center p-1 hover:opacity-50"
      onClick={() => onHandleClick(!isEditing)}
    >
      <EditIcon />
      <span className="font-semibold text-moderateBlue">Edit</span>
    </button>
  );
};

export default EditButton;

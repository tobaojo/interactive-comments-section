import ReplyIcon from "../Icons/ReplyIcon";
import { type Comment } from "../../types/types";

const ReplyButton = ({ onHandleClick }) => {
  return (
    <button
      className="flex space-x-1 items-center p-1 hover:opacity-50"
      onClick={onHandleClick}
    >
      <ReplyIcon />
      <span className="font-semibold text-moderateBlue">Reply</span>
    </button>
  );
};

export default ReplyButton;

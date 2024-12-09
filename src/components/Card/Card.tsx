import { Comment } from "../../types/types";
import LikeCounter from "../LikeCounter/LikeCounter";
import ReplyButton from "../ReplyButton/ReplyButton";

type CardProps = {
  comment: Comment;
};

const Card = ({ comment }: CardProps) => {
  return (
    <div className="bg-white w-full self-center h-auto p-4 m-4 md:w-8/12 flex-grow overflow-y-auto">
      <div className="flex space-x-4 items-center p-2">
        <img
          src={comment?.user?.image.png}
          alt={`user - ${comment?.user?.username}`}
          className="w-[10%] md:w-[7%]"
        />
        <h1 className="text-darkBlue font-semibold">{comment.user.username}</h1>
        <span>{comment.createdAt}</span>
      </div>
      <p className="m-4">{comment.content}</p>
      <div className="flex items-center justify-between">
        <LikeCounter score={comment.score} />
        <ReplyButton onHandleClick={() => console.log("Reply")} />
      </div>
    </div>
  );
};

export default Card;

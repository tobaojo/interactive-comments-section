import { useState } from "react";
import { Comment, User } from "../../types/types";
import LikeCounter from "../LikeCounter/LikeCounter";
import ReplyButton from "../ReplyButton/ReplyButton";
import ReplyCard from "../ReplyCard/ReplyCard";

type CardProps = {
  comment: Comment;
  currentUser: User;
  addReply: (comment: Comment, replies: Comment[]) => void;
};

const Card = ({ comment, currentUser, addReply }: CardProps) => {
  const [replies, setReplies] = useState<Comment[]>(comment?.replies || []);
  const [replyText, setReplyText] = useState("");

  const handleClick = () => {
    if (replies) {
      const hasEmptyReplies = replies.some((reply) => !reply.content);

      if (hasEmptyReplies) {
        replies.filter((reply) => !reply.content);
        return;
      }
    }

    const newReply: Comment = {
      id: Math.floor(Math.random() * 100000),
      content: replyText,
      createdAt: "Today",
      replies: [],
      score: 0,
      user: currentUser,
    };

    setReplies((prevReplies) => [...(prevReplies ?? []), newReply]);
  };
  return (
    <div className="bg-lightGray w-full self-center h-auto m-4 md:w-8/12 flex flex-col flex-grow ">
      <div className="bg-white p-4  ">
        <div className="flex space-x-4 items-center p-2">
          <img
            src={comment?.user?.image?.png}
            alt={`user - ${comment?.user?.username}`}
            className="w-[10%] md:w-[7%]"
          />
          <h1 className="text-darkBlue font-semibold">
            {comment?.user.username}
          </h1>
          <span>{comment?.createdAt}</span>
        </div>
        <p className="m-4">{comment?.content}</p>
        <div className="flex items-center justify-between">
          <LikeCounter score={comment?.score} comment={comment} />
          <ReplyButton onHandleClick={handleClick} />
        </div>
      </div>
      <div className="flex flex-col items-end border-l-2 border-gray-300 bg-lightGray">
        {replies &&
          replies.map((reply: Comment) => (
            <ReplyCard
              key={reply?.id}
              reply={reply}
              setReplies={setReplies}
              currentUser={currentUser}
              setReplyText={setReplyText}
              replyText={replyText}
              replies={replies}
              comment={comment}
              addReply={addReply}
            />
          ))}
      </div>
    </div>
  );
};

export default Card;

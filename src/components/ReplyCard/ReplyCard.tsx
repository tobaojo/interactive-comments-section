import React from "react";
import { User, type Comment } from "../../types/types";
import LikeCounter from "../LikeCounter/LikeCounter";
import ReplyButton from "../ReplyButton/ReplyButton";

type ReplyCardProps = {
  reply: Comment;
  currentUser: User;
  replyText: string;
  setReplyText: React.Dispatch<React.SetStateAction<string>>;
  setReplies: React.Dispatch<React.SetStateAction<Comment[]>>;
  replies: Comment[];
};

const ReplyCard = ({
  reply,
  currentUser,
  replyText,
  setReplyText,
  setReplies,
  replies,
}: ReplyCardProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedReplies = replies.map((blankReply) => {
      if (blankReply.id === reply.id) {
        return { ...blankReply, content: replyText };
      } else {
        return blankReply;
      }
    });
    setReplies(updatedReplies);
    setReplyText("");
    console.log(replies);
  };
  return (
    <>
      {!reply.content ? (
        <div className="bg-white w-[90%] h-auto p-4 ml-4 my-4">
          <small>{reply.id}</small>
          <form
            className="grid grid-cols-2 grid-rows-1 md:flex md:flex-row space-x-2 gap-4"
            onSubmit={handleSubmit}
          >
            <img
              src={currentUser?.image.png}
              alt={`USER - currentUser`}
              className="w-[20%] order-2 flex-1 md:order-1 md:self-center"
            />
            <textarea
              name="reply-box"
              id="reply-box"
              className="border border-lightGray w-full p-4 rounded-xl col-span-2 order-1 md:order-2"
              placeholder="Add Comment..."
              onChange={(e) => setReplyText(e.target.value)}
              value={replyText}
            ></textarea>
            <input
              name="SEND"
              type="submit"
              className="bg-moderateBlue text-white py-3  px-4 rounded-lg order-3 w-10/12 md:order-3 md:w-4/12 md:h-[50%]"
            />
          </form>
        </div>
      ) : (
        <div className="bg-white w-[90%] h-auto p-4 ml-4 my-4">
          <div className="flex space-x-4 items-center p-2">
            <img
              src={reply?.user?.image.png}
              alt={`user - ${reply?.user?.username}`}
              className="w-[10%] md:w-[7%]"
            />
            <h1 className="text-darkBlue font-semibold">
              {reply.user.username}
            </h1>
            <span>{reply.createdAt}</span>
          </div>
          <p className="m-4">{reply.content}</p>
          <div className="flex items-center justify-between">
            <LikeCounter score={reply.score} />
            <ReplyButton onHandleClick={() => console.log("Reply")} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyCard;

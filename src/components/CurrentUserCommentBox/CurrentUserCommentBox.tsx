import { type User, type Comment } from "../../types/types";
import React, { useState } from "react";

type CurrentUserCommentBoxProps = {
  currentUser: User;
  addComment: (newComment: Comment) => void;
};

const CurrentUserCommentBox = ({
  currentUser,
  addComment,
}: CurrentUserCommentBoxProps) => {
  const [responseText, setResponseText] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reply: Comment = {
      id: Math.floor(Math.random() * 1000),
      content: responseText,
      createdAt: "Today",
      replies: [],
      score: 0,
      user: currentUser,
    };
    console.log(reply);
    addComment(reply);
  };
  return (
    <div className="bg-white w-full self-center p-4 m-4 md:w-8/12 h-auto sticky bottom-0">
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
          onChange={(e) => setResponseText(e.target.value)}
          value={responseText}
        ></textarea>
        <input
          name="SEND"
          type="submit"
          className="bg-moderateBlue text-white py-3  px-4 rounded-lg order-3 w-10/12 md:order-3 md:w-4/12 md:h-[50%]"
        />
      </form>
    </div>
  );
};

export default CurrentUserCommentBox;

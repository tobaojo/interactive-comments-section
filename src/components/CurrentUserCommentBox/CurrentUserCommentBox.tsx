import { type User } from "../../types/types";
import { useState } from "react";

type CurrentUserCommentBoxProps = {
  currentUser: User;
};

const CurrentUserCommentBox = ({ currentUser }: CurrentUserCommentBoxProps) => {
  const [responseText, setResponseText] = useState("");
  console.log(responseText);
  return (
    <div className="bg-white w-full self-center p-4 m-4 md:w-8/12 h-auto absolute bottom-0 flex flex-col-reverse md:flex-row">
      <div className="flex flex-row justify-between m-2">
        <img
          src={currentUser?.image.png}
          alt={`USER - currentUser`}
          className="w-[10%] self-center md:w-[70%]"
        />
        <button className="bg-moderateBlue text-white py-3 px-6 rounded-lg">
          SEND
        </button>
      </div>
      <textarea
        name="reply-box"
        id="reply-box"
        className="border border-lightGray w-full p-4 rounded-xl"
        placeholder="Add Comment..."
        onChange={(e) => setResponseText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default CurrentUserCommentBox;

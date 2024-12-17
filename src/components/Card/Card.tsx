import { useEffect, useState } from "react";
import { Comment, User } from "../../types/types";
import LikeCounter from "../LikeCounter/LikeCounter";
import ReplyButton from "../ReplyButton/ReplyButton";
import ReplyCard from "../ReplyCard/ReplyCard";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";

type CardProps = {
  comment: Comment;
  currentUser: User;
  addReply: (comment: Comment, replies: Comment[]) => void;
  editComment: (editedComment: Comment) => void;
  editReply: (Oldcomment: Comment, editedReply: Comment) => void;
  deleteComment: (deletedComment: Comment) => void;
  deleteReply: (comment: Comment, deletedReply: Comment) => void;
};

const Card = ({
  comment,
  currentUser,
  addReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
}: CardProps) => {
  const [replies, setReplies] = useState<Comment[]>(comment?.replies || []);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setReplies(comment?.replies ?? []);
  }, [comment.replies]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

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

  const handleEditClick = (comment: Comment) => {
    setIsEditing(!isEditing);
    const editedComment = {
      ...comment,
      content: commentContent,
    };
    editComment(editedComment);
  };

  const handleDeleteClick = (comment: Comment) => {
    deleteComment(comment);
  };

  return (
    <>
      <DeleteModal
        isModalOpen={modalIsOpen}
        closeModal={closeModal}
        handleDeleteClick={handleDeleteClick}
      >
        hello
      </DeleteModal>
      <div className="bg-lightGray w-full self-center h-auto m-4 md:w-8/12 flex flex-col flex-grow ">
        <div className="bg-white p-4 ">
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
            {comment.user.username === currentUser.username && (
              <>
                <EditButton
                  onHandleClick={() => handleEditClick(comment)}
                  isEditing={isEditing}
                />
                <DeleteButton onHandleClick={openModal} />
              </>
            )}
          </div>
          {isEditing && comment.user.username === currentUser.username ? (
            <textarea
              name="content"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="border border-lightGray w-full p-4 rounded-xl col-span-2 order-1 md:order-2"
            ></textarea>
          ) : (
            <p className="m-4">{commentContent}</p>
          )}
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
                editReply={editReply}
                deleteReply={deleteReply}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Card;

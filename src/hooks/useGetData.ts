import { useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/utils";
import { fetchComments, fetchCurrentUser } from "../api/api";
import { type User, type Comment } from "../types/types";

export function useCurrentUser(): [
  User | null,
  { isLoading: boolean; error: string | null },
] {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const cachedUser = getFromLocalStorage<User>("currentUser");
        if (cachedUser) {
          setCurrentUser(cachedUser);
        } else {
          const data = await fetchCurrentUser();
          setCurrentUser(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    getCurrentUser();
  }, []);
  return [currentUser, { isLoading, error }];
}

export function useComments(): [
  Comment[],
  {
    isLoading: boolean;
    error: string | null;
    addComment: (newComment: Comment) => void;
    addReply: (oldComment: Comment, replies: Comment[]) => void;
    editComment: (editComment: Comment) => void;
    editReply: (oldComment: Comment, editedReply: Comment) => void;
    deleteComment: (deletedComment: Comment) => void;
    deleteReply: (comment: Comment, deletedReply: Comment) => void;
  },
] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function getComments() {
      setIsLoading(true);
      try {
        const cachedComments = getFromLocalStorage<Comment[]>("comments");
        if (cachedComments) {
          setComments(cachedComments);
        } else {
          const data = await fetchComments();
          setComments(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    getComments();
    setIsLoading(false);
  }, []);

  function addComment(newComment: Comment) {
    setComments((prevComments) => {
      const updatedComments = [...(prevComments ?? []), newComment];
      saveToLocalStorage("comments", updatedComments);
      return updatedComments;
    });
  }

  function editComment(editedComment: Comment) {
    const updatedComments = comments.map((comment) => {
      if (comment?.id === editedComment.id) {
        return editedComment;
      } else {
        return comment;
      }
    });

    saveToLocalStorage("comments", updatedComments);
  }

  function deleteComment(deletedComment: Comment) {
    setComments((prevComments) => {
      const updatedComments = prevComments.filter((comment: Comment) => {
        return comment.id !== deletedComment.id;
      });
      saveToLocalStorage("comments", updatedComments);
      return updatedComments;
    });
  }

  function addReply(oldComment: Comment, replies: Comment[]) {
    const updatedComments: Comment[] = comments.map((comment: Comment) => {
      if (comment.id === oldComment.id) {
        return {
          ...comment,
          replies: [...(oldComment.replies ?? []), ...replies],
        };
      } else {
        return comment;
      }
    });
    saveToLocalStorage("comments", updatedComments);
  }

  function editReply(oldComment: Comment, editedReply: Comment) {
    const updatedComments = comments.map((comment) => {
      if (oldComment.id === comment.id) {
        const updatedReplies = comment.replies?.map((reply) => {
          if (reply.id === editedReply.id) {
            return editedReply;
          } else {
            return reply;
          }
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      } else {
        return comment;
      }
    });
    saveToLocalStorage("comments", updatedComments);
  }

  function deleteReply(parentComment: Comment, deletedReply: Comment) {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === parentComment.id) {
          const updatedReplies = comment.replies?.filter((reply) => {
            return reply.id !== deletedReply.id;
          });
          return {
            ...comment,
            replies: updatedReplies,
          };
        } else {
          return comment;
        }
      });
      console.log(updatedComments);
      // saveToLocalStorage("comments", updatedComments);
      return updatedComments;
    });
  }

  return [
    comments,
    {
      isLoading,
      error,
      addComment,
      addReply,
      editComment,
      editReply,
      deleteComment,
      deleteReply,
    },
  ];
}

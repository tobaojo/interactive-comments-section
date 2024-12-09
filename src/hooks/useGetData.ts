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
  return [comments, { isLoading, error, addComment, addReply }];
}

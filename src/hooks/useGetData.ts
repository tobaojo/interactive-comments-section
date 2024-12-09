import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/utils";
import { fetchComments, fetchCurrentUser } from "../api/api";
import { type User, type Comment } from "../types/types";

export function useCurrentUser(): [
  User | null,
  { isLoading: boolean; error: string | null },
] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
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
  Comment[] | null,
  { isLoading: boolean; error: string | null },
] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

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
  }, []);
  return [comments, { isLoading, error }];
}

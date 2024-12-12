import React, { useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/utils";
import { Comment } from "../types/types";

export function useLikeScore(score: number): [
  number,
  {
    incrementLikeCount: () => void;
    decrementLikeCount: () => void;
    setOldComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  },
] {
  const [likeCount, setLikeCount] = useState(score);
  const [oldComment, setOldComment] = useState<Comment | null>(null);

  const incrementLikeCount = () => setLikeCount(likeCount + 1);
  const decrementLikeCount = () => setLikeCount(likeCount - 1);

  useEffect(() => {
    async function updateCommentscore() {
      try {
        const cachedComments: Comment[] =
          getFromLocalStorage<Comment[]>("comments") ?? [];

        const updatedComments = cachedComments.map((comment) => {
          if (oldComment?.id === comment.id) {
            return { ...comment, score: likeCount };
          } else if (comment.replies) {
            const updatedReplies = comment.replies.map((reply) => {
              if (oldComment?.id === reply.id) {
                return { ...reply, score: likeCount };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });

        saveToLocalStorage("comments", updatedComments);
      } catch (error) {
        console.error(error);
      }
    }
    updateCommentscore();
  }, [likeCount, oldComment?.id]);

  return [likeCount, { incrementLikeCount, decrementLikeCount, setOldComment }];
}

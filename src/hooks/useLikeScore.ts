import { useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/utils";
import { type Comment } from "../types/types";

export function useLikeScore(
  score: number,
): [
  number,
  { incrementLikeCount: () => void; decrementLikeCount: () => void },
] {
  const [likeCount, setLikeCount] = useState(score);
  const [oldComment, setOldComment] = useState<Comment | null>(null);
  const incrementLikeCount = () => setLikeCount(likeCount + 1);

  const decrementLikeCount = () => setLikeCount(likeCount - 1);

  useEffect(() => {
    async function updateCommentscore() {
      try {
        const cachedComments: Comment[] = getFromLocalStorage("comments");

        if (cachedComments) {
          const updatedComments = cachedComments.map((comment) => {
            if (oldComment?.id === comment.id) {
              return { ...comment, score: likeCount };
            } else {
              return comment;
            }
          });
          //   console.log(updatedComments);
          saveToLocalStorage("comments", updatedComments);
        }
      } catch (error) {
        console.error(error);
      }
    }
    updateCommentscore();
  }, [likeCount, oldComment?.id]);

  return [likeCount, { incrementLikeCount, decrementLikeCount, setOldComment }];
}

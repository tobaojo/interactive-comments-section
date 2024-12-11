import { Comment } from "../../types/types";

type LikeCounterProps = {
  score: number;
  comment: Comment;
};

import { useLikeScore } from "../../hooks/useLikeScore";

const LikeCounter = ({ score, comment }: LikeCounterProps) => {
  const [likeCount, { incrementLikeCount, decrementLikeCount, setOldComment }] =
    useLikeScore(score);

  const handleClick = (comment: Comment, fn: () => void) => {
    setOldComment(comment);
    fn();
  };

  return (
    <div className="flex space-x-4 bg-veryLightGray px-4 py-1 rounded-xl text-xl">
      <button
        onClick={() => handleClick(comment, incrementLikeCount)}
        className="font-semibold text-grayishBlue"
      >
        +
      </button>
      <p className="font-semibold text-moderateBlue">{likeCount}</p>
      <button
        onClick={() => handleClick(comment, decrementLikeCount)}
        className="font-semibold text-grayishBlue"
      >
        -
      </button>
    </div>
  );
};

export default LikeCounter;

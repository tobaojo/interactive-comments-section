import { Comment } from "../../types/types";

type LikeCounterProps = {
  score: number;
  comment: Comment;
};

import { useLikeScore } from "../../hooks/useLikeScore";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";

const LikeCounter = ({ score, comment }: LikeCounterProps) => {
  const [likeCount, { incrementLikeCount, decrementLikeCount, setOldComment }] =
    useLikeScore(score);

  const handleClick = (comment: Comment, fn: () => void) => {
    setOldComment(comment);
    fn();
  };

  return (
    <div className="bg-veryLightGray rounded-lg text-xl px-2 md:py-3">
      <div className="md:mx-auto flex flex-row md:flex-col p-1 md:space-x-0 md:space-y-1 space-x-4 items-center ">
        <button
          onClick={() => handleClick(comment, incrementLikeCount)}
          className="font-semibold text-grayishBlue"
        >
          <PlusIcon />
        </button>
        <p className="font-semibold text-moderateBlue">{likeCount}</p>
        <button
          onClick={() => handleClick(comment, decrementLikeCount)}
          className="font-semibold text-grayishBlue "
        >
          <MinusIcon />
        </button>
      </div>
    </div>
  );
};

export default LikeCounter;

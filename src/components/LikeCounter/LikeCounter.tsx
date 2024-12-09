import { useState } from "react";

type LikeCounterProps = {
  score: number;
};

const LikeCounter = ({ score }: LikeCounterProps) => {
  const [likeCount, setLikeCount] = useState(score);
  const incrementLikeCount = () => setLikeCount(likeCount + 1);
  const decrementLikeCount = () => setLikeCount(likeCount - 1);
  return (
    <div className="flex space-x-4 bg-veryLightGray px-4 py-1 rounded-xl text-xl">
      <button
        onClick={incrementLikeCount}
        className="font-semibold text-grayishBlue"
      >
        +
      </button>
      <p className="font-semibold text-moderateBlue">{likeCount}</p>
      <button
        onClick={decrementLikeCount}
        className="font-semibold text-grayishBlue"
      >
        -
      </button>
    </div>
  );
};

export default LikeCounter;

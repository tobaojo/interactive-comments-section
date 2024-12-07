import { useState } from "react";

const LikeCounter = () => {
  const [likeCount, setLikeCount] = useState(0);
  const incrementLikeCount = () => setLikeCount(likeCount + 1);
  const decrementLikeCount = () => setLikeCount(likeCount - 1);
  console.log(typeof likeCount);
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

import ReplyButton from "../ReplyButton/ReplyButton";

const Card = () => {
  return (
    <div className="bg-white w-full self-center h-auto p-4">
      <div className="flex space-x-4 items-center p-2">
        <img
          src="../../../images/avatars/image-amyrobson.png"
          alt="User - Amy Robson"
          className="w-[10%]"
        />
        <h1 className="text-darkBlue font-semibold">Amy Robson</h1>
        <span>1 month ago</span>
      </div>
      <p>
        Impressive! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Amet magnam eaque beatae, necessitatibus a vitae optio repellendus sunt,
        voluptatem quam saepe voluptate architecto quo rem totam ea illum
        sapiente excepturi.
      </p>
      <div className="flex items-center justify-between">
        <span>Like Counter</span>
        <ReplyButton />
      </div>
    </div>
  );
};

export default Card;

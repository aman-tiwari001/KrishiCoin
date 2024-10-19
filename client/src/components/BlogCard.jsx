import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

function BlogCard({
  id,
  title,
  image,
  description,
  user,
  quantityLeft,
  quantity,
}) {
  const percentageLeft = (quantityLeft / quantity) * 100;
  const truncatedDescription = (description) => {
    const cnt = 320;
    return description.length > cnt
      ? description.substring(0, cnt) + "..."
      : description;
  };
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    if (isDownvoted) setIsDownvoted(false); // Reset downvote if upvoted
  };

  const handleDownvote = () => {
    setIsDownvoted(!isDownvoted);
    if (isUpvoted) setIsUpvoted(false); // Reset upvote if downvoted
  };
  return (
    <div className="card h-[200px] p-2 flex flex-row bg-[#283e2f] text-[#e0fce7] w-full shadow-xl rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="object-cover w-[25vw] rounded-t-lg h-[100%]"
      />

      <div className="w-[70vw]  px-2 flex flex-col justi h-[100%]">
        <div className=" overflow-x-auto h-[16%]">
          <h2 className="max-md:text-lg text-lg font-semibold">{title}</h2>
        </div>
        <h5 className="text-xs h-[10%]  border-b-2 pb-3 border-slate-100 text-gray-300">
          By {user}
        </h5>

        <div className="flex justify-between w-[100%] h-[73%] items-center mt-2 ">
          <div className=" h-[90%] w-[80%] overflow-y-auto p-1 ">
            {truncatedDescription(description)}
          </div>
          <div className=" h-[30%] w-[20%] flex items-center p-2 border-[1px] border-[#e0fce7] rounded-[20px] bg-[#0a260e]">
            <div
              className={`flex w-[50%] justify-center border-e-[1px] cursor-pointer ${isUpvoted ? "text-green-500" : "text-gray-300"} transition-all duration-300`}
              onClick={handleUpvote}
            >
              <span className="pt-1 pr-1">
                <FaRegThumbsUp/>
              </span>
              <span>{isUpvoted ? 202 : 201}</span>
            </div>
            <div
              className={`flex w-[50%] justify-center cursor-pointer  ${isDownvoted ? "text-red-500" : "text-gray-300"} transition-all duration-300`}
              onClick={handleDownvote}
            >
              <span className="pt-1 pr-1">
                <FaRegThumbsDown />
              </span>
              <span>{isDownvoted ? 202 : 201}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

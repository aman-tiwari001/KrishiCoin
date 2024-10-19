import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

function Blogs({ src, title, created_at, upvotes, downvotes }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <div className="flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-md">
      <div className="max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img className="w-full h-full object-cover" src={src} alt="" />
        </div>
      </div>

      <div className="max-md:w-full w-1/3 mb-4 md:mb-0 text-left flex_fix max-md:justify-start justify-evenly md:h-48">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>

        
      </div>

      <div className="max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center">
        <h3 className="bg-[#ffeb39] w-fit px-2 py-1 rounded-md text-lg font-semibold">
          {formatDate(created_at)}
        </h3>

        <div className="w-[50%] flex items-center p-2  rounded-[20px] bg-[#] border-2 border-black">
          <div
            className={`flex w-[50%] justify-center border-e-[2px] cursor-pointer border-black ${"text-green-700"} transition-all duration-300`}
          >
            <span className="pt-1 pr-1">
              <FaRegThumbsUp />
            </span>
            <span>{upvotes}</span>
          </div>
          <div
            className={`flex w-[50%] justify-center cursor-pointer ${"text-red-500"} transition-all duration-300`}
          >
            <span className="pt-1 pr-1">
              <FaRegThumbsDown />
            </span>
            <span>{downvotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;

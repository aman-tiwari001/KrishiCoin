import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { downvoteBlog, upvoteBlog } from "../apis/blog";
import toast from "react-hot-toast";

function BlogCard({
  id,
  title,
  image,
  description,
  user,
  upvotes_arr,
  downvotes_arr,
}) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(upvotes_arr.length);
  const [downvotes, setDownvotes] = useState(downvotes_arr.length);
  useEffect(() => {
    if (upvotes_arr.includes(localStorage.getItem("userId"))) {
      setIsUpvoted(true);
    }
    if (downvotes_arr.includes(localStorage.getItem("userId"))) {
      setIsDownvoted(true);
    }
  }, [upvotes_arr, downvotes_arr]);

  const handleUpvote = async () => {
    try {
      if (isUpvoted) {
        await upvoteBlog(id);
        setIsUpvoted(false);
        setUpvotes(upvotes > 0 ? upvotes - 1 : 0);
        toast.success("Upvote removed");
      } else {
        if (isDownvoted) {
          await upvoteBlog(id);
          setIsDownvoted(false);
          setDownvotes(downvotes > 0 ? downvotes - 1 : 0);
        }

        await upvoteBlog(id);
        setIsUpvoted(true);
        setUpvotes(upvotes + 1);
        toast.success("Blog upvoted successfully");
      }
    } catch (error) {
      console.error("Error upvoting blog:", error);
    }
  };

  const handleDownvote = async (e) => {
    try {
      if (isDownvoted) {
        await downvoteBlog(id);
        setIsDownvoted(false);
        setDownvotes(downvotes > 0 ? downvotes - 1 : 0);
        toast.success("Downvote removed");
      } else {
        if (isUpvoted) {
          await downvoteBlog(id);
          setIsUpvoted(false);
          setUpvotes(upvotes > 0 ? upvotes - 1 : 0);
        }

        await downvoteBlog(id);
        setIsDownvoted(true);
        setDownvotes(downvotes + 1);
        toast.success("Blog downvoted successfully");
      }
    } catch (error) {
      console.error("Error downvoting blog:", error);
    }
  };

  return (
    // <Link to={`/blog/${id}`}>
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
            {/* {truncatedDescription(description)} */}
          </div>
          <div className=" h-[30%] w-[20%] flex items-center p-2 border-[1px] border-[#e0fce7] rounded-[20px] bg-[#0a260e]">
            <div
              className={`flex w-[50%] justify-center border-e-[1px] cursor-pointer ${
                isUpvoted ? "text-green-500" : "text-gray-300"
              } transition-all duration-300`}
              onClick={handleUpvote}
            >
              <span className="pt-1 pr-1">
                <FaRegThumbsUp />
              </span>
              <span>{upvotes}</span>
            </div>
            <div
              className={`flex w-[50%] justify-center cursor-pointer  ${
                isDownvoted ? "text-red-500" : "text-gray-300"
              } transition-all duration-300`}
              onClick={handleDownvote}
            >
              <span className="pt-1 pr-1">
                <FaRegThumbsDown />
              </span>
              <span>{downvotes}</span>
            </div>
          </div>
        </div>
        <Link to={`/blog/${id}`}>
          <button className="btn w-fit btn-success bg-[#778457] border-0 text-white text-sm py-1 px-3 rounded-md">
            Read More
          </button>
        </Link>
      </div>
    </div>
    // </Link>
  );
}

export default BlogCard;

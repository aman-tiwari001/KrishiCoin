import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { downvoteBlog, upvoteBlog } from "../apis/blog";
import toast from "react-hot-toast";

function BlogCard({ id, title, image, user, upvotes_arr, downvotes_arr }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(upvotes_arr.length);
  const [downvotes, setDownvotes] = useState(downvotes_arr.length);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (upvotes_arr.includes(userId)) {
      setIsUpvoted(true);
    }
    if (downvotes_arr.includes(userId)) {
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

  const handleDownvote = async () => {
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
    <div className="card bg-gradient-to-r from-green-300 h-[220px] to-lime-200 text-[#1e5b1e] shadow-lg rounded-lg overflow-hidden flex flex-row  w-1/2 md:w-[30%]">
      <img
        src={image}
        alt={title}
        className="object-cover w-[50%] h-[100%] rounded-s-lg"
      />
      <div className="flex flex-col ms-3  justify-start w-[50%] p-2">
        <h2 className="text-lg font-bold truncate">{title}</h2>
        <h5 className="text-sm text-gray-700 mt-1 ">~By {user}</h5>
        <div className="flex justify-between items-center">
          <div className="flex items-center border-[1px] border-gray-800 px-4 py-1 rounded-3xl mt-4 space-x-4">
            <div
              className={`flex items-center border-e-[2px] pe-3 border-slate-400 cursor-pointer ${
                isUpvoted ? "text-green-600" : "text-gray-700"
              }`}
              onClick={handleUpvote}
            >
              <FaRegThumbsUp className="mr-1" />
              <span>{upvotes}</span>
            </div>
            <div
              className={`flex items-center cursor-pointer ${
                isDownvoted ? "text-red-400" : "text-gray-700"
              }`}
              onClick={handleDownvote}
            >
              <FaRegThumbsDown className="mr-1" />
              <span>{downvotes}</span>
            </div>
          </div>
        </div>
        <Link to={`/blog/${id}`}>
          <button className=" btn btn-success text-white py-1 px-3 mt-7 rounded-md transition duration-300">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;

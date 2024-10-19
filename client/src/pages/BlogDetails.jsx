import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import CustomLoader from "../components/CustomLoader";
import { useParams } from "react-router-dom";
import { downvoteBlog, getBlog, upvoteBlog } from "../apis/blog";
import toast from "react-hot-toast";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlog(id);
        setBlogData(response);
        const userId = localStorage.getItem("userId");

        setUpvotes(response.upvotes.length);
        setDownvotes(response.downvotes.length);
        setIsUpvoted(response.upvotes.some((user) => user._id === userId));
        setIsDownvoted(response.downvotes.some((user) => user._id === userId));
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const response = await getBlog(id);
      setBlogData(response);
      const userId = localStorage.getItem("userId");

      setUpvotes(response.upvotes.length);
      setDownvotes(response.downvotes.length);
      setIsUpvoted(response.upvotes.some((user) => user._id === userId));
      setIsDownvoted(response.downvotes.some((user) => user._id === userId));
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleUpvote = async () => {
    try {
      if (isUpvoted) {
        await upvoteBlog(id);
        toast.success("Upvote removed");
        setIsUpvoted(false);
      } else {
        if (isDownvoted) {
          await downvoteBlog(id);
          toast.success("Downvote removed");
          setIsDownvoted(false);
        }

        await upvoteBlog(id);
        toast.success("Blog upvoted successfully");
        setIsUpvoted(true);
      }

      fetchBlogData();
    } catch (error) {
      console.error("Error upvoting blog:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      if (isDownvoted) {
        await downvoteBlog(id);
        toast.success("Downvote removed");
        setIsDownvoted(false);
      } else {
        if (isUpvoted) {
          await upvoteBlog(id);
          toast.success("Upvote removed");
          setIsUpvoted(false);
        }

        await downvoteBlog(id);
        toast.success("Blog downvoted successfully");
        setIsDownvoted(true);
      }
      fetchBlogData();
    } catch (error) {
      console.error("Error downvoting blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching blog...
        </div>
      </div>
    );
  }
  return (
    <div className="text-black">
      <div className="h-[80px] flex"></div>
      <div className="max-w-2xl mx-auto p-6 mt-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>
        <div className="h-[30%] w-[20%] my-2 flex items-center p-2 border-[1px] border-[#e0fce7] rounded-[20px] bg-[#0a260e]">
          <div
            className={`flex w-[50%] justify-center border-e-[1px] cursor-pointer ${
              isUpvoted ? "text-green-500" : ""
            } transition-all duration-300`}
            onClick={handleUpvote}
          >
            <span className="pt-1 pr-1">
              <FaRegThumbsUp />
            </span>
            <span>{upvotes}</span>
          </div>
          <div
            className={`flex w-[50%] justify-center cursor-pointer ${
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
        <div className="mb-4">
          <img
            src={blogData.image}
            alt="Blog Cover"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="prose lg:prose-xl max-w-none">
          {parse(blogData.content)}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

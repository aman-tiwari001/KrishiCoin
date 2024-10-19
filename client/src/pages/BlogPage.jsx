import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import CustomLoader from "../components/CustomLoader";
import { getBlogs } from "../apis/blog";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching blogs...
        </div>
      </div>
    );
  }
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-[75px] pt-8">
      <h1 className="text-3xl mt-5 text-theme text-center font-bold">Blogs</h1>
      <div className="w-full flex_fix_invert items-center justify-center gap-2 mt-[20px] px-4">
        <label className="input input-bordered flex items-center gap-2 w-1/2 max-md:w-full bg-white shadow-lg text-black">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <Link to="/sell">
          <button className="btn btn-success flex items-center gap-2 bg-[#2bac4b] px-4 py-2 rounded-lg text-white">
            <IoMdAddCircle className="text-lg" /> Write your Blog
          </button>
        </Link>
      </div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.content}
              user={blog.writer.name}
              image={blog.image}
              upvotes_arr={blog.upvotes}
              downvotes_arr={blog.downvotes}
            />
          ))
        ) : (
          <p className="card h-[250px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl rounded-lg overflow-hidden justify-center items-center">
            No Blogs found
          </p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;

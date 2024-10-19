import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import CustomLoader from "../components/CustomLoader";
import { getBlogs } from "../apis/blog";


function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="h-screen">
      <div className="h-[80px]"></div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {blogs.map((blog) => (
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
        ))}
      </div>
    </div>
  );
}

export default BlogPage;

import React from "react";
import parse from "html-react-parser";

const BlogDetails = () => {
  const blogData = {
    title: "Exploring the Future of Farmers",
    coverImage: "https://t3.ftcdn.net/jpg/06/54/10/38/360_F_654103899_UbQA2q3iQR2Wo4L2n36tgUyN4yzZVVbN.jpg", 
    body: `
      <h1 style="color: #4a90e2;">A New Era for Frontend Frameworks</h1>
      <p>With the rapid evolution of frameworks like <strong>React</strong>, <strong>Vue</strong>, 
      and <strong>Svelte</strong>, developers are achieving unprecedented levels of efficiency.</p>
      <ul>
        <li>React enables component-based architecture.</li>
        <li>Vue offers reactive data binding and simplicity.</li>
        <li>Svelte compiles to highly optimized JavaScript.</li>
      </ul>
      <blockquote style="font-style: italic; color: #555;">“The future of the web is fast, modular, and developer-friendly.”</blockquote>
    `,
  };

  return (
    <div className="">
      <div className="h-[80px] flex"></div>
      <div className="max-w-2xl mx-auto p-6 mt-4   bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>

        <div className="mb-4">
          <img
            src={blogData.coverImage}
            alt="Blog Cover"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="prose lg:prose-xl max-w-none">
          {parse(blogData.body)}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

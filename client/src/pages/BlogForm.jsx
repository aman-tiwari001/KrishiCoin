import React, { useState, useRef, useCallback } from "react";
import JoditEditor from "jodit-react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../apis/blog";

const BlogForm = () => {
  const editor = useRef(null);

  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    coverImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const [imagePreviews, setImagePreviews] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  
    // Convert images to Base64 format
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
      })
    ).then((base64Images) => {
      setBlogData((prev) => ({
        ...prev,
        coverImage: base64Images[0], 
      }));
    });
  };
  

  const handleEditorChange = useCallback(
    debounce((content) => {
      setBlogData((prev) => ({ ...prev, body: content }));
    }, 300),
    []
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: blogData.title,
      content: blogData.body,
      image: blogData.coverImage,
    };

    try {
      await createBlog(payload);
      toast.success("Blog created successfully");
      navigate("/blog");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog");
    }
  };

  return (
    <div className="h-screen">
      <div className="h-[80px]"></div>
      <div className="flex items-center justify-center p-2">
        <div className="max-w-xl h-[85vh] overflow-y-auto p-6 bg-[#283e2f] text-[#e0fce7] shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Create a Blog Post</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-transparent border rounded-md"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 "
              />

              <div className="flex gap-2 mt-2">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="cover"
                    className="w-full h-25 object-cover rounded-md"
                  />
                ))}
                  </div>
            </div>

            <div className="mb-4 text-black">
              <label className="block text-sm text-[#e0fce7] font-medium mb-2">
                Body
              </label>
              <JoditEditor
                ref={editor}
                value={blogData.body}
                onChange={handleEditorChange}
                config={{
                  readonly: false,
                  placeholder: "Start typing your blog...",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full btn bg-[#459cb2] text-white font-medium p-2 text-xl rounded-md hover:bg-[#53a166]"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;

import axiosInstance from "./base_url";

export const createBlog = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/blogs/create", payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/blogs");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blogs:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export const getBlog = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blog:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}


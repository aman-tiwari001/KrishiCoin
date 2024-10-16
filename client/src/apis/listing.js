import axiosInstance from "./base_url";

export const createListing = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/listings/create", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error.response ? error.response.data : error.message);
    throw error; 
  }
};


export const getListings = async () => {
  try {
    const response = await axiosInstance.get("/api/listings");
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const getListing = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listing:", error.response ? error.response.data : error.message);
    throw error;
  }
}
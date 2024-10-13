import axiosInstance from "./base_url";

export const startFundraiser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/fundraisers/start", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error.response ? error.response.data : error.message);
    throw error; 
  }
};


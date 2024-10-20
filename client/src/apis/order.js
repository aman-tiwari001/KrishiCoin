import axiosInstance from "./base_url";

export const createOrder = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/orders/create", payload);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getTotalOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/orders/get/all");
    return response.data;
  } catch (error) {
    console.error(
      "Error getting total orders:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



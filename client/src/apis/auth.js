import axios from "axios";
import { baseUrl } from "./base_url";

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(
      baseUrl + "/api/users/create-user",
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const checkUser = async (wallet_address) => {
  try {
    const response = await axios.get(
      baseUrl + "/api/users/check-user?wallet_address=" + wallet_address
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error checking user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    const response = await axios.get(baseUrl + "/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error getting user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

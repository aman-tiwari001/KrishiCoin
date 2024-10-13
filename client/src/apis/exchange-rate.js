import axios from "axios";

export const getCurrencyExchangeRate = async (currency) => {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting exchange rate:", error);
    throw error;
  }
}

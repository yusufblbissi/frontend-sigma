import axios from "axios";
import { configuration } from "@/config/config";
const apiUrl = configuration.MAIN_URL;

export const loanService = {
  submitLoan: (loanData) => {
    return axios.post(`${apiUrl}/submit`, loanData);
  },
  getLoans: () => {
    return axios.get(apiUrl);
  },
  async getLoanById(loanId) {
    try {
      const response = await axios.get(`${apiUrl}/${loanId}`);
      return response;
    } catch (error) {
      console.error("Error fetching loan details:", error);
      throw error;
    }
  },
  getListOfCurrencies: async () => {
    try {
      const response = await axios.get(`${apiUrl}/listOfCurrencies`);
      return response.data;
    } catch (error) {
      console.error("Error fetching currencies:", error);
      throw error; 
    }
  },
};

import { useCallback } from "react";
import axios from "axios";

const usePostTransaction = () => {
  return useCallback(async (transaction: any) => {
    const response = await axios.post("http://localhost:4000/api/transactions", transaction);
    return response.data;
  }, []);
};

export default usePostTransaction;




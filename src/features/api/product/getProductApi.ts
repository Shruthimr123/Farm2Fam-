import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:3002/products'; 
export const getProductsAPI = createAsyncThunk(
  'product/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;  // array of ProductPayload
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);
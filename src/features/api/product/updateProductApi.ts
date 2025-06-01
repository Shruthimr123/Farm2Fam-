import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductPayload } from '../../../types/product';

const BASE_URL = 'http://localhost:3000/products'; // adjust this if needed
export const updateProductAPI = createAsyncThunk(
  'product/update',
  async (product: ProductPayload, thunkAPI) => {
    try {
      const { _id, imageUrl, ...rest } = product; // exclude imageUrl from update
      const response = await axios.put(`${BASE_URL}/${_id}`, rest);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

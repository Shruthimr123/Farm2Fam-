import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/products'; // Your backend endpoint

export const deleteProductAPI = createAsyncThunk(
  'product/delete',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`); // Deletes product by ID
      return id; // Return ID to help remove it from state in the reducer
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductPayload } from '../../../types/product';

const BASE_URL = 'http://localhost:3002/products'; // adjust this if needed
export const createProductAPI = createAsyncThunk(
  'product/create',
  async (product: ProductPayload, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', String(product.price));
      formData.append('quantity', String(product.quantity));
      if (product.description) formData.append('description', product.description);
      if (product.imageUrl instanceof File) {
        formData.append('image', product.imageUrl); // key must match backend multer config
      }
      const response = await axios.post(`${BASE_URL}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

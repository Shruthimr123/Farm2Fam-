import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInAPI = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials);
      const { message, accessToken, user } = response.data;

      // Return the shape your auth slice expects
      return {
        message,
        token: accessToken,   // rename accessToken to token
        name: user.name,
        email: user.email,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'login failure');
    }
  }
);

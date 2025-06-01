import { createAsyncThunk } from "@reduxjs/toolkit";
//axios is used to connect to the api's
import axios from "axios";

// defining AsyncThunk based api call before createSlice
export const signUpAPI = createAsyncThunk(
    'auth/register',
    async (credentials: {name:string, email: string, password: string, phone:string },thunkAPI )=>{
        try {
            const response=await axios.post('http://localhost:3000/auth/register',credentials)
            return response.data

        } catch (error :any) {
            thunkAPI.rejectWithValue(error.response?.data?.message || 'failed to register')
        }
    }
)
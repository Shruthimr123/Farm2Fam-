import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth";
import { signInAPI } from "../api/auth/loginApi";
import { signUpAPI } from "../api/auth/signupApi";

const initialState: AuthState = {
  isAuthenticated: false,
  name: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  email: null,
  phone: null,
};

// Try to restore auth from sessionStorage
const savedName = sessionStorage.getItem("userName");
const savedToken = sessionStorage.getItem("token");
const savedEmail = sessionStorage.getItem("email");
if (savedName && savedToken) {
  initialState.isAuthenticated = true;
  initialState.name = savedName;
  initialState.token = savedToken;
  if (savedEmail) {
    initialState.email = savedEmail;
  }
}

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.name = null;
      state.token = null;
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signInAPI.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; email: string; name: string; token: string }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.name = action.payload.name;
          state.token = action.payload.token;
          state.message = action.payload.message;
          state.email = action.payload.email;
          // Save to sessionStorage
          sessionStorage.setItem("userName", action.payload.name);
          sessionStorage.setItem("token", action.payload.token);
          sessionStorage.setItem("email", action.payload.email);
        }
      )
      .addCase(signInAPI.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.name = null;
        state.token = null;
        state.error = action.payload as string;
      });

    // similarly for signUpAPI ...
            builder
                .addCase(signUpAPI.pending, (state) => {
                state.loading = true;
                    state.error = null
            })
            .addCase(signUpAPI.fulfilled, (state, action: PayloadAction<{ message: string, email: string, name: string, token: string }>) => {
                state.loading = false;
                    state.isAuthenticated= true;
                    // state.name = action.payload.name,
                    // state.token = action.payload.token,
                    state.message = action.payload.message
        })
            .addCase(signUpAPI.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated= false
                // state.name = null,
                //     state.token = null,
                    state.error = action.payload as string
            });
 
    
  },
});

export const { signOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;

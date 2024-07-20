import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      return {
        isAuth: true,
        user: action.payload,
      };
    },
    register: (state, action) => {
      console.log(action);
      return {
        isAuth: true,
        user: action.payload,
      };
    },
    getUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { login, register, getUser } = authSlice.actions;
export default authSlice.reducer;

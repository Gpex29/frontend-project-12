/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const authAdapter = createEntityAdapter();

const initialState = { loggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      const { data } = payload;
      localStorage.setItem('userId', JSON.stringify(data));
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.authHeader = {};
      state.username = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const selectors = authAdapter.getSelectors((state) => state.auth);
export default authSlice.reducer;

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const authAdapter = createEntityAdapter();

const user = JSON.parse(localStorage.getItem('userId'));

const initialState = {
  loggedIn: localStorage.hasOwnProperty('userId'),
  username: user?.username || null,
  token: user?.token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      const { data } = payload;
      localStorage.setItem('userId', JSON.stringify(data));
      state.loggedIn = true;
      state.token = data.token;
      state.username = data.username;
    },
    logOut: (state) => {
      localStorage.removeItem('userId');
      state.loggedIn = false;
      state.token = null;
      state.username = null;
    },
  },
});

export const { logIn, logOut, getUsername } = authSlice.actions;
export const selectors = authAdapter.getSelectors((state) => state.auth);
export default authSlice.reducer;

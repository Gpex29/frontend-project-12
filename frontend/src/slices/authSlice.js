import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const authAdapter = createEntityAdapter();

const initialState = { authHeader: {}, loggedIn: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.authHeader = {};
    },
    getAuthHeader: (state) => {
      state.loggedIn = false;
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        state.loggedIn = true;
        state.authHeader = { Authorization: `Bearer ${userId.token}` }
      }
        state.authHeader = {};
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const selectors = authAdapter.getSelectors((state) => state.auth);
export default authSlice.reducer;
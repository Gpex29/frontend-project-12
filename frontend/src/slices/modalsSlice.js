/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter();

const initialState = { type: null, id: null };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.id = null;
    },
    showModal: (state, action) => {
      const { type, id } = action.payload;
      state.type = type;
      state.id = id;
    },
  },
});

export const { hideModal, showModal } = modalsSlice.actions;
export const selectors = modalsAdapter.getSelectors((state) => state.modals);
export default modalsSlice.reducer;

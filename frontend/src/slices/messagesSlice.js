import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../hooks/routes';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (authHeader) => {
    const response = await axios.get(routes.messagesPath(), {
      headers: authHeader,
    });
    return response.data;
  },
)
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, messagesAdapter.addMany)
  },
});
export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;

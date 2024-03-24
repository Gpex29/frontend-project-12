import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../hooks/routes';
import { actions as channelsActions } from './channelsSlice';

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
);
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, messagesAdapter.addMany)
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

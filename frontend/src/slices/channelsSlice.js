import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const getChannels = createAsyncThunk(
  'channels/getchannels',
  async (authHeader) => {
    const response = await axios.get(routes.channelsPath(), {
      headers: authHeader,
    });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, channelsAdapter.addMany);
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

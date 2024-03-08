import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../hooks/routes';

const chansAdapter = createEntityAdapter();

const initialState = chansAdapter.getInitialState();

export const getChans = createAsyncThunk(
  'chans/getChans',
  async (authHeader) => {
    const response = await axios.get(routes.channelsPath(), {
      headers: authHeader,
    });
    console.log(response)
    return response.data;
  },
)
const chansSlice = createSlice({
  name: 'chans',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChans.fulfilled, chansAdapter.addMany)
  },
});
export const selectors = chansAdapter.getSelectors((state) => state.chans);

export default chansSlice.reducer;
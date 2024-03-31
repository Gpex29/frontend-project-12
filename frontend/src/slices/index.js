import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import authReducer from './authSlice.js';
import modalsReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    auth: authReducer,
    modals: modalsReducer,
  },
});

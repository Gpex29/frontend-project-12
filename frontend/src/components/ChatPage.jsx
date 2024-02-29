import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../hooks/routes.js';
import getNormalized from '../utilities/getNormalized.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch;
  useEffect(() => {
    const fetchContent = async () => {
      const channelsPromise = axios.get(routes.channelsPath(), { headers: getAuthHeader() });
      const messagesPromise = axios.get(routes.messagesPath(), { headers: getAuthHeader() });
      const [channelsResponse, messagesResponse] = await Promise.all([channelsPromise, messagesPromise]);
      const channels = getNormalized(channelsResponse.data);
      const messages = getNormalized(messagesResponse.data);
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };

    fetchContent();
  }, []);
  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default ChatPage;
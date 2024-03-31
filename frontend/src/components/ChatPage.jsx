/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import * as filter from 'leo-profanity';
import routes from '../routes/routes.js';
import Channels from './chatComponents/ChannelsContainer.jsx';
import Messages from './chatComponents/MessagesContainer.jsx';
import { getChannels } from '../slices/channelsSlice.js';
import { getMessages } from '../slices/messagesSlice.js';
import { logOut } from '../slices/authSlice.js';
import getAuthHeader from '../utilities/getAuthHeader.js';
import ChannelProvider from '../provider/ChannelProvider.jsx';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  filter.add(filter.getDictionary('ru'));

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getChannels(getAuthHeader()));
    dispatch(getMessages(getAuthHeader()));
    setIsLoading(false);
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const { t } = useTranslation();

  const quit = () => dispatch(logOut());

  return (
    <div className="d-flex flex-column vh-100">
      {isLoading ? null : (
        <ChannelProvider>
          <Navbar className="bg-body-tertiary justify-content-between p-3">
            <Nav.Link as={Link} to={routes.linkToChat}>
              Hexlet Chat
            </Nav.Link>
            <Button type="button" className="btn btn-primary" onClick={quit}>
              {t('logOut')}
            </Button>
          </Navbar>
          <div className="d-flex flex-row h-100 m-4 border">
            <Channels socket={socket} filter={filter} />
            <Messages socket={socket} filter={filter} />
          </div>
        </ChannelProvider>
      )}
    </div>
  );
};

export default ChatPage;

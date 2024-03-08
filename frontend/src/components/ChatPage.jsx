import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../hooks/routes.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../authentication/AuthContext.jsx';
import Channels from './chatComponents/Channels.jsx';
import Messages from './chatComponents/Messages.jsx';
import { getChannels } from '../slices/channelsSlice.js';
import { getMessages } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};
const ChatPage = () => {
  const dispatch = useDispatch();
  const { logOut } = useContext(AuthContext);
  const { t } = useTranslation();
  const [currentChannelId, setCurrentChannelId] = useState('1');
  const onClick = (id) => setCurrentChannelId(id);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getChannels(getAuthHeader()));
    dispatch(getMessages(getAuthHeader()));
    setIsLoading(false);
  }, []);

  return (
    <div className='d-flex flex-column vh-100'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navbar className='bg-body-tertiary justify-content-between p-3'>
            <Nav.Link as={Link} to={routes.linkToChat}>
              Hexlet Chat
            </Nav.Link>
            <Button type='button' className='btn btn-primary' onClick={logOut}>
              {t('logOut')}
            </Button>
          </Navbar>
          <div className='d-flex flex-row h-100 m-4 border'>
            <Channels currentChannelId={currentChannelId} onClick={onClick} />
            {<Messages currentChannelId={currentChannelId} />}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;

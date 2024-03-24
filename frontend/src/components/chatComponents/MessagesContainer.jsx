import React, { useEffect, useRef, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ArrowSquare from '../../svg/ArrowSquare.jsx';
import getAuthHeader from '../../utilities/getAuthHeader.js';
import { selectors, actions } from '../../slices/messagesSlice.js';
import axios from 'axios';
import routes from '../../hooks/routes.js';
import { useTranslation } from 'react-i18next';


const Messages = ({ currentChannelId, socket, filter }) => {
  const inputEl = useRef();
  const dispatch = useDispatch();
  const username = JSON.parse(localStorage.getItem('userId')).username;
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const filtredText = filter.clean(text);
    const newMessage = { body: filtredText, channelId: currentChannelId, username };
    const authHeader = getAuthHeader();
    axios.post(routes.messagesPath(), newMessage, {
      headers: authHeader,
    });
    inputEl.current.focus();
    setText('');
  };
  
  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(actions.addMessage(newMessage));
    });
    inputEl.current.focus();
  }, []);

  const channels = useSelector((state) => state.channels);
  const currentChannel = channels.entities[currentChannelId];
  const currentChannelName = currentChannel?.name;
  const messages = useSelector(selectors.selectAll);
  const currentMessages =
    messages.length > 0
      ? messages.filter((message) => message.channelId === currentChannelId)
      : [];
  return (
    <div className='d-flex flex-column p-o h-100' style={{ width: '80%' }}>
      <div className='mt-1 ml-3 d-flex flex-column ps-4 pe-2'>
        <b># {currentChannelName}</b>
        <span className='text-muted '>{t('chatPage.messagesCounter.count', {count: currentMessages.length})}</span>
      </div>
      <div id='messages-box' className='chat-messages overflow-auto px-5'>
        {currentMessages.map((message) => {
          return (
            <div key={message.id} className='text-break mb-2'>
              <b>{message.username}</b>: {message.body}
            </div>
          );
        })}
      </div>
      <div className='mt-4 p-3 mt-auto'>
        <div className='mt-auto'>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <input
              type='text'
              value={text}
              onChange={handleChange}
              style={{ width: '90%' }}
              ref={inputEl}
              placeholder={t('chatPage.messageInput')}
            />
            <button disabled={text.length > 0 ? false: true} type='submit'>{<ArrowSquare />}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

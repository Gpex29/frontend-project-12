import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowSquare from '../../svg/ArrowSquare';

const Messages = ({ currentChannelId }) => {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  } 
  const channels = useSelector((state) => state.channels);
  const channelName = channels.entities[currentChannelId]?.name;
  return (
    <div className='d-flex flex-column p-o h-100' style={{ width: '80%' }}>
      <div className='mt-1 justify-content-between ml-3 ps-4 pe-2'>
        <b># {channelName}</b>
      </div>
      <div id='messages-box' className='chat-messages overflow-auto px-5'></div>
      <div className='mt-4 p-3 mt-auto'>
        <div className='mt-auto'>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input type='text' value={text} onChange={handleChange} style={{ width: '90%' }} />
          <button type='submit'>{<ArrowSquare />}</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PlusSquare from '../../svg/PlusSquare';
import cn from 'classnames';
import { selectors } from '../../slices/channelsSlice';

const Channels = ({currentChannelId, onClick}) => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const channelClasses = ['btn', 'text-start', 'w-100', 'rounded-0', 'light'];
  return (
    <div className='d-flex flex-column border' style={{ width: '20%' }} >
      <div className='mt-1 d-flex justify-content-between mb-2 ps-2 pe-2'>
        <b>{t('channels')}</b>
        <Button className='p-0 btn btn-group-vertical bg-light border-0'>
          <PlusSquare />
        </Button>
      </div>
      <ul id='channels-box' className='mb-3 px-2 h-100'>
        {channels.map(({id, name}) => (
          <li key={id} style={{ listStyle: 'none' }}>
            <button id={id} className={cn(channelClasses, {'btn-secondary': currentChannelId === id} )} onClick={() =>onClick(id)}>
              # {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;

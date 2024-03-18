import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PlusSquare from '../../svg/PlusSquare';
import cn from 'classnames';
import { actions, selectors } from '../../slices/channelsSlice';
import RenderModal from '../modals/RenderModal';
import getToast from '../../utilities/getToast';

const Channels = ({ currentChannelId, chooseChannel, socket, filter }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    socket.on('newChannel', ({ name, removable, id }) => {
      const filtredName = filter.clean(name);
      getToast('addChannel', t);
      dispatch(actions.addChannel({ name: filtredName, removable, id }));
      chooseChannel(id);
    });
    socket.on('removeChannel', ({ id }) => {
      getToast('removeChannel', t);
      chooseChannel('1');
      dispatch(actions.removeChannel(id));
    });
    socket.on('renameChannel', (payload) => {
      getToast('renameChannel', t);
      const filtredName = filter.clean(payload.name);
      dispatch(
        actions.updateChannel({
          id: payload.id,
          changes: {
            name: filtredName,
          },
        })
      );
    });
  }, []);

  const buttonClasses = ['btn', 'text-start', 'w-100', 'rounded-0', 'light'];

  return (
    <div className='d-flex flex-column border' style={{ width: '20%' }}>
      <div className='mt-1 d-flex justify-content-between mb-2 ps-2 pe-2'>
        <b>{t('chatPage.channels')}</b>
        <Button
          className='p-0 btn btn-group-vertical bg-light border-0'
          onClick={() => showModal('adding')}
        >
          <PlusSquare />
        </Button>
      </div>
      <ul id='channels-box' className='mb-3 px-2 h-100'>
        {channels.map(({ id, name, removable }) => (
          <li key={id} style={{ listStyle: 'none' }}>
            <button
              id={id}
              className={cn(buttonClasses, {
                'btn-secondary': currentChannelId === id,
              })}
              onClick={() => chooseChannel(id)}
            >
              # {name}
            </button>
            {removable && (
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  split
                  variant='success'
                  id='dropdown-custom-2'
                />
                <Dropdown.Menu >
                  <Dropdown.Item
                    eventKey='1'
                    onClick={() => showModal('removing', { id })}
                  >
                    {t('remove')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey='2'
                    onClick={() => showModal('renaming', { id })}
                  >
                    {t('chatPage.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
      {RenderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default Channels;

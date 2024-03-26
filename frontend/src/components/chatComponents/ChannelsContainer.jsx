/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, SplitButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions, selectors } from '../../slices/channelsSlice';
import RenderModal from '../modals/RenderModal';
import getToast from '../../utilities/getToast';

const Channels = ({
  currentChannelId, chooseChannel, socket, filter,
}) => {
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
        }),
      );
    });
  }, []);

  const buttonClasses = ['btn', 'text-start', 'w-100', 'rounded-0', 'light'];

  return (
    <div className="d-flex flex-column border" style={{ width: '20%' }}>
      <div className="mt-1 d-flex justify-content-between mb-2 ps-2 pe-2">
        <b>{t('chatPage.channels')}</b>
        <Button
          variant="outline-primary"
          className="btn"
          onClick={() => showModal('adding')}
        >
          {t('chatPage.addButton')}
        </Button>
      </div>
      <ul id="channels-box" className="mb-3 px-2 h-100 d-flex flex-column ">
        {channels.map(({ id, name, removable }) => (
          <li key={id} style={{ listStyle: 'none' }}>
            {!removable ? (
              <button
                type="button"
                id={id}
                className={cn(buttonClasses, {
                  'btn-secondary': currentChannelId === id,
                })}
                onClick={() => chooseChannel(id)}
              >
                <span className="me-1">#</span>
                {name}
              </button>
            ) : (
              <SplitButton
                id={id}
                variant={currentChannelId === id ? 'secondary' : 'light'}
                title={` #${name}`}
                className={cn(buttonClasses, {
                  'btn-secondary': currentChannelId === id,
                })}
                onClick={() => chooseChannel(id)}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => showModal('removing', { id })}
                >
                  {t('remove')}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => showModal('renaming', { id })}
                >
                  {t('chatPage.rename')}
                </Dropdown.Item>
              </SplitButton>
            )}
          </li>
        ))}
      </ul>
      {RenderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default Channels;

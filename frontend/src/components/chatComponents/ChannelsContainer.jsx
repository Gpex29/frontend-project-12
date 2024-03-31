/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { actions, selectors } from '../../slices/channelsSlice';
import RenderModal from '../modals/RenderModal';
import ChannelContext from '../../context/ChannelContext';
import { showModal } from '../../slices/modalsSlice';

const Channels = ({
  socket, filter,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const { currentChannelId, chooseChannel } = useContext(ChannelContext);
  const onShow = (type, id = null) => {
    dispatch(showModal({ type, id }));
  };

  useEffect(() => {
    socket.on('newChannel', ({ name, removable, id }) => {
      const filtredName = filter.clean(name);
      dispatch(actions.addChannel({ name: filtredName, removable, id }));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(actions.removeChannel(id));
    });

    socket.on('renameChannel', (payload) => {
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

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  const buttonClasses = 'w-100 rounded-0 text-start';

  return (
    <div className="d-flex flex-column border" style={{ width: '20%' }}>
      <div className="mt-1 d-flex justify-content-between mb-2 ps-2 pe-2">
        <b>{t('chatPage.channels')}</b>
        <Button
          variant="outline-primary"
          className="btn"
          onClick={() => onShow('adding')}
        >
          {t('chatPage.addButton')}
        </Button>
      </div>
      <ul id="channels-box" className="mb-3 px-2 h-100 d-flex flex-column">
        {channels.map(({ id, name, removable }) => (
          <li key={id} style={{ listStyle: 'none' }}>
            {!removable ? (
              <button
                type="button"
                name={name}
                id={id}
                onClick={() => chooseChannel(id)}
                className={cn(
                  buttonClasses,
                  {
                    'btn-secondary': currentChannelId === id,
                  },
                  'btn',
                )}
              >
                <span className="me-1">#</span>
                {name}
              </button>
            ) : (
              <Dropdown as="ButtonGroup">
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={() => chooseChannel(id)}
                    className={cn(buttonClasses, {
                      'text-truncate btn btn-secondary':
                        currentChannelId === id,
                      light: currentChannelId !== id,
                    })}
                  >
                    {`# ${name}`}
                  </button>
                  <Dropdown.Toggle
                    split
                    id={id}
                    className="rounded-start-0"
                    variant={currentChannelId === id ? 'secondary' : 'light'}
                  >
                    <span className="visually-hidden">
                      {t('chatPage.channelManagment')}
                    </span>
                  </Dropdown.Toggle>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => onShow('removing', id)}
                  >
                    {t('remove')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => onShow('renaming', id)}
                  >
                    {t('chatPage.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
      {RenderModal()}
    </div>
  );
};

export default Channels;

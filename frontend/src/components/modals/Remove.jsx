import React, { useContext } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes/routes';
import getAuthHeader from '../../utilities/getAuthHeader';
import ChannelContext from '../../context/ChannelContext';
import { hideModal } from '../../slices/modalsSlice';

const Remove = () => {
  const { t } = useTranslation();
  const { chooseChannel } = useContext(ChannelContext);
  const dispatch = useDispatch();
  const onHide = () => dispatch(hideModal());
  const modalInfo = useSelector((state) => state.modals);
  const { token } = useSelector((state) => state.auth);

  const removeChannel = async (e) => {
    e.preventDefault();
    try {
      const path = [routes.channelsPath(), modalInfo.id].join('/');
      await axios.delete(path, {
        headers: getAuthHeader(token),
      });
      toast.success(t('toasts.removeChannel'));
      onHide();
      chooseChannel('1');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">
          {t('modals.sure')}
          ?
        </p>
        <form className="d-flex justify-content-end">
          <FormGroup>
            <button
              type="button"
              onClick={onHide}
              className="btn btn-secondary mt-2 me-2"
            >
              {t('modals.cancel')}
            </button>
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={removeChannel}
            >
              {t('remove')}
            </button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../hooks/routes';
import getAuthHeader from '../../utilities/getAuthHeader';
import { useTranslation } from 'react-i18next';

const Remove = ({ onHide, modalInfo }) => {
  const { t } = useTranslation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const path = [routes.channelsPath(), modalInfo.item.id].join('/');
    axios.delete(path, {
      headers: getAuthHeader(),
    });
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='lead'>{t('modals.sure')}?</p>
        <form onSubmit={handleSubmit} className='d-flex justify-content-end'>
          <FormGroup>
            <input
              type='submit'
              onClick={onHide}
              className='btn btn-secondary mt-2 me-2'
              value={t('modals.cancel')}
            />
            <input
              type='submit'
              className='btn btn-danger mt-2'
              value={t('remove')}
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

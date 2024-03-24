import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import getAuthHeader from '../../utilities/getAuthHeader';
import routes from '../../hooks/routes';
import { getChannelSchema } from '../../utilities/getValidationSchemas';

const Rename = ({ onHide, modalInfo }) => {
  const { t } = useTranslation();
  const { item } = modalInfo;
  const formik = useFormik({
    onSubmit: (values) => {
      try {
        const editedChannel = { name: values.name };
        axios.patch([routes.channelsPath(), values.id].join('/'), editedChannel, {
          headers: getAuthHeader(),
        });
        onHide();
      } catch (error) {
        console.log(error);
      }
    },
    initialValues: { id: item.id, name: '' },
    validationSchema: getChannelSchema(),
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup onSubmit={formik.handleSubmit}>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </FormGroup>
          <FormGroup className="d-flex justify-content-end">
            <button
              type="submit"
              onClick={onHide}
              className="btn btn-secondary mt-2 me-2"
            >
              {t('modals.cancel')}
            </button>
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value={t('modals.send')}
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

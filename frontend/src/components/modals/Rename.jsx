import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import getAuthHeader from '../../utilities/getAuthHeader';
import routes from '../../routes/routes';
import { getChannelSchema } from '../../utilities/getValidationSchemas';
import { selectors } from '../../slices/channelsSlice';
import { hideModal } from '../../slices/modalsSlice';

const Rename = () => {
  const { t } = useTranslation();
  const modalInfo = useSelector((state) => state.modals);
  const { id } = modalInfo;
  const channels = useSelector(selectors.selectAll);
  const names = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const onHide = () => dispatch(hideModal());

  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const editedChannel = { name: values.name };
        await axios.patch([routes.channelsPath(), values.id].join('/'), editedChannel, {
          headers: getAuthHeader(),
        });
        toast.success(t('toasts.renameChannel'));
        onHide();
      } catch (error) {
        console.log(error);
      }
    },
    initialValues: { id, name: '' },
    validationSchema: getChannelSchema(names, t),
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
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelsName')}</Form.Label>
            <FormControl
              required
              id="name"
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
              type="button"
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

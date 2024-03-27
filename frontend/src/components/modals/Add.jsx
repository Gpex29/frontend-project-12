import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import routes from '../../hooks/routes';
import getAuthHeader from '../../utilities/getAuthHeader';
import { getChannelSchema } from '../../utilities/getValidationSchemas';
import { selectors } from '../../slices/channelsSlice';
import ChannelContext from '../../context/ChannelContext';

const Add = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const channels = useSelector(selectors.selectAll);
  const names = channels.map(({ name }) => name);
  const { chooseChannel } = useContext(ChannelContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit:
    async (values) => {
      try {
        const channel = { name: values.name };
        const response = await axios.post(routes.channelsPath(), channel, {
          headers: getAuthHeader(),
        });
        toast.success(t('toasts.addChannel'));
        onHide();
        chooseChannel(response.data.id);
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: getChannelSchema(names, t),
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.channelsName')}</Form.Label>
            <FormControl
              required
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.submitForm && formik.errors.name}
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </FormGroup>
          <div className="d-flex justify-content-end">
            <input
              type="button"
              onClick={onHide}
              className="btn btn-primary mt-2 me-2"
              value={t('modals.cancel')}
            />
            <input
              type="submit"
              className="btn btn-primary mt-2 me-2"
              value={t('modals.send')}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

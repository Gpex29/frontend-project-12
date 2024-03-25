import React, { useEffect, useRef, useState } from 'react';
import {
  Navbar, Nav, Button, Form, Card,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../hooks/routes';
import { logIn, logOut } from '../slices/authSlice';
import { getRegistrationSchema } from '../utilities/getValidationSchemas';

const SignUpPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.auth);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const quit = () => dispatch(logOut());
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: getRegistrationSchema(),
    onSubmit: async ({ username, password }) => {
      dispatch(logOut());
      try {
        await axios.post(routes.signupPath(), { username, password });
        const { data } = await axios.post(routes.loginPath(), {
          username,
          password,
        });
        localStorage.setItem('userId', JSON.stringify(data));
        dispatch(logIn());
        navigate(routes.linkToChat);
      } catch (error) {
        setRegistrationFailed(true);
      }
    },
  });
  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-between p-3">
        <Nav.Link as={Link} to={routes.linkToChat}>
          Hexlet Chat
        </Nav.Link>
        {loggedIn && (
          <Button type="button" className="btn btn-primary" onClick={quit}>
            {t('logOut')}
          </Button>
        )}
      </Navbar>
      <Card style={{ minWidth: '18rem', maxWidth: '50rem', margin: '2rem' }}>
        <Card.Body>
          <Card.Title className="card-title text-center mb-4">
            {t('registration')}
          </Card.Title>
          <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="form-label" for="username">{t('signUpPage.username')}</Form.Label>
              <Form.Control
                type="username"
                name="username"
                required
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.username && formik.errors.username}
                ref={inputRef}
              />
              {formik.touched.username && formik.errors.username && (
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label" for="password">{t('password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label" for="passwordConfirm">{t('signUpPage.passwordConfirm')}</Form.Label>
              <Form.Control
                type="passwordConfirm"
                name="passwordConfirm"
                required
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.passwordConfirm
                  && formik.errors.passwordConfirm
                }
              />
              {formik.touched.passwordConfirm
                && formik.errors.passwordConfirm && (
                  <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirm}</Form.Control.Feedback>
              )}
              {registrationFailed && <div className="text-danger">{t('errors.userExists')}</div>}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mb-3"
              variant="outline-primary"
            >
              {t('signUpPage.registrate')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUpPage;

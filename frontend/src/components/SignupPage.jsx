import React, { useEffect, useRef, useState } from 'react';
import {
  Navbar, Nav, Button, Form, Card,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../routes/routes';
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
    validationSchema: getRegistrationSchema(t),
    onSubmit: async ({ username, password }) => {
      dispatch(logOut());
      try {
        await axios.post(routes.signupPath(), { username, password });
        const { data } = await axios.post(routes.loginPath(), {
          username,
          password,
        });
        dispatch(logIn({ data }));
        navigate(routes.linkToChat);
      } catch (error) {
        setRegistrationFailed(true);
      }
    },
  });
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar className="bg-body-tertiary justify-content-between p-3 mb-5">
        <Nav.Link as={Link} to={routes.linkToChat}>
          Hexlet Chat
        </Nav.Link>
        {loggedIn && (
          <Button type="button" className="btn btn-primary" onClick={quit}>
            {t('logOut')}
          </Button>
        )}
      </Navbar>
      <Card className="justify-content-center align-content-center mx-auto w-50">
        <Card.Body className="text-center">
          <Card.Title className="text-center mb-4">
            {t('registration')}
          </Card.Title>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="visually-hidden" htmlFor="username">
                {t('signUpPage.username')}
              </Form.Label>
              <Form.Control
                type="username"
                name="username"
                id="username"
                autoComplete="username"
                placeholder={t('signUpPage.username')}
                required
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.username && formik.errors.username}
                ref={inputRef}
              />
              {formik.touched.username && formik.errors.username && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="visually-hidden" htmlFor="password">
                {t('password')}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder={t('password')}
                required
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="visually-hidden" htmlFor="passwordConfirm">
                {t('signUpPage.passwordConfirm')}
              </Form.Label>
              <Form.Control
                type="passwordConfirm"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder={t('signUpPage.passwordConfirm')}
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
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
              )}
              {registrationFailed && (
                <div className="text-danger">{t('errors.userExists')}</div>
              )}
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

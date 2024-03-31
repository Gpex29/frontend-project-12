import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar, Nav, Button, Form, Card,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes/routes.js';
import { logIn, logOut } from '../slices/authSlice.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      dispatch(logOut());
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        dispatch(logIn());
        navigate(routes.linkToChat);
      } catch (error) {
        console.log(error);
        setAuthFailed(true);
      }
    },
  });
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar className="bg-body-tertiary justify-content-between p-3  mb-5">
        <Nav.Link as={Link} to={routes.linkToChat}>
          Hexlet Chat
        </Nav.Link>
      </Navbar>
      <Card className="justify-content-center align-content-center mx-auto w-50">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {t('logInPage.logIn')}
          </Card.Title>
          <Card.Text>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label className="visually-hidden" htmlFor="username">
                  {t('logInPage.nicknameInput')}
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="username"
                  name="username"
                  id="username"
                  placeholder={t('logInPage.nicknameInput')}
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="visually-hidden" htmlFor="password">
                  {t('password')}
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t('password')}
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                />
              </Form.Group>
              {authFailed && (
                <div className="text-danger">{t('logInPage.error')}</div>
              )}
              <Button
                type="submit"
                className="w-100 mb-3"
                variant="outline-primary"
              >
                {t('logInPage.logIn')}
              </Button>
            </Form>
            <div className="card-footer text-center">
              <span>
                {t('logInPage.noAccount')}
                ?
                {' '}
              </span>
              <Link as={Link} to={routes.lintToSignup}>
                {t('registration')}
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;

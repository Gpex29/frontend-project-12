import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Form, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import routes from '../hooks/routes.js'
import axios from 'axios';
import AuthContext from '../authentication/AuthContext.jsx';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { logIn, logOut } = useContext(AuthContext);
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
      setAuthFailed(false)
      logOut();
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data))
        logIn();
        navigate(routes.linkToChat);
      } catch(error) {
        console.log(error);
        setAuthFailed(true);
      }
    }
  })
  return (
    <div>
      <h1>{t('enter')}</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
        <Form.Control 
          type='username' 
          name='username' 
          placeholder={t('yourNickname')} 
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={authFailed}
          ref={inputRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control 
            type='password' 
            name='password' 
            placeholder={t('password')} 
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={authFailed}
          />
        </Form.Group>
        <Button type='submit' variant="outline-primary" >{t('enter')}</Button>
      </Form>
      <div>
        <span>{`${t('noAccount')}?`}</span><Nav.Link as={Link} to="/signup">Page Two</Nav.Link>
      </div>
    </div>
  )
}

export default LoginPage;

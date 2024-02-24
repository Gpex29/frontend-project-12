import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log({...values})
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
          />
        </Form.Group>
        <Button type='submit' variant="outline-primary" >{t('enter')}</Button>
      </Form>
      <div>
        <span>{`${t('noAccount')}?`}</span>
      </div>
    </div>
  )
}

export default LoginPage;

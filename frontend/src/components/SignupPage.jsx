import React from 'react';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('registration')}</h1>
    </div>
  )
}

export default SignUpPage;
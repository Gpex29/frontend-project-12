import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div id="error-page">
      <h1>{t('notFoundPage')}</h1>
    </div>
  );
};

export default ErrorPage;

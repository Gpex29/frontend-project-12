/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { selectors } from '../slices/channelsSlice';

export const getChannelSchema = () => {
  const channels = useSelector(selectors.selectAll);
  const names = channels.map(({ name }) => name);
  const { t } = useTranslation();

  return Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.nameSymbols'))
      .max(20, t('errors.nameSymbols'))
      .notOneOf(names, t('errors.mustBeUniq'))
      .required(t('errors.requiredField')),
  });
};

export const getRegistrationSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.nameSymbols'))
      .max(20, t('errors.nameSymbols'))
      .required(t('errors.requiredField')),
    password: Yup.string().min(6, t('errors.moreSixSymbols')).required(t('errors.requiredField')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.passwordsMustBeEqual'))
      .required(t('errors.requiredField')),
  });
};

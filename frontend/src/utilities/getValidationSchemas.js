import * as Yup from 'yup';

export const getChannelSchema = (names, t) => Yup.object().shape({
  name: Yup.string()
    .min(3, t('errors.nameSymbols'))
    .max(20, t('errors.nameSymbols'))
    .notOneOf(names, t('errors.mustBeUniq'))
    .required(t('errors.requiredField')),
});

export const getRegistrationSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(3, t('errors.nameSymbols'))
    .max(20, t('errors.nameSymbols'))
    .required(t('errors.requiredField')),
  password: Yup.string().min(6, t('errors.moreSixSymbols')).required(t('errors.requiredField')),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], t('errors.passwordsMustBeEqual'))
    .required(t('errors.requiredField')),
});

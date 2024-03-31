const apiPatch = '/api/v1';

export default {
  loginPath: () => [apiPatch, 'login'].join('/'),
  signupPath: () => [apiPatch, 'signup'].join('/'),
  channelsPath: () => [apiPatch, 'channels'].join('/'),
  messagesPath: () => [apiPatch, 'messages'].join('/'),
  linkToChat: '/',
  linkToLogin: '/login',
  lintToSignup: '/signup',
  linkToNotFound: '*',
};

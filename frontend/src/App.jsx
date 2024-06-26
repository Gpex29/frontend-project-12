import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index.js';
import ErrorPage from './components/ErrorPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import routes from './routes/routes.js';
import store from './slices/index.js';

injectStyle();

const ChatRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return loggedIn ? (
    children
  ) : (
    <Navigate to={routes.linkToLogin} state={{ from: location }} />
  );
};

const App = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });
  const {
    linkToChat, linkToLogin, lintToSignup, linkToNotFound,
  } = routes;

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'testenv',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path={linkToLogin} element={<LoginPage />} />
                <Route path={lintToSignup} element={<SignupPage />} />
                <Route
                  path={linkToChat}
                  element={(
                    <ChatRoute>
                      <ChatPage />
                    </ChatRoute>
                  )}
                />
                <Route path={linkToNotFound} element={<ErrorPage />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;

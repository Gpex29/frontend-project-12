import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import routes from './hooks/routes.js';
import { Provider, useSelector } from 'react-redux';
import store from './slices/index.js';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

injectStyle();

const ChatRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return loggedIn ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

const App = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });
  const { linkToChat, linkToLogin, lintToSignup } = routes;

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={linkToLogin} element={<LoginPage />} />
            <Route path={lintToSignup} element={<SignupPage />} />
            <Route
              path={linkToChat}
              element={
                <ChatRoute>
                    <ChatPage />
                </ChatRoute>
              }
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};

export default App;

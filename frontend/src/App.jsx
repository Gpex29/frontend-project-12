import React/* , { useContext } */ from 'react';
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
import AuthProvider from './authentication/AuthProvider.jsx';
import LoginPage from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import routes from './hooks/routes.js';
//import AuthContext from './authentication/AuthContext.jsx';
import { Provider, useSelector } from 'react-redux';
import store from './slices/index.js';

const ChatRoute = ({ children }) => {
  //const { loggedIn } = useContext(AuthContext);
  const { loggedIn } = useSelector((state) => state.auth)
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
      <AuthProvider>
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
        </BrowserRouter>
      </AuthProvider>
                  </Provider>
    </I18nextProvider>
  );
};

export default App;

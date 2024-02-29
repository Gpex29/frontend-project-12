import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import AuthProvider from '../authentication/AuthProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import routes from '../hooks/routes.js';
import { useContext } from 'react';
import AuthContext from '../authentication/AuthContext.jsx';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../slices/index.js';

const ChatRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();
  return loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const { linkToChat, linkToLogin, lintToSignup, } = routes;

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Nav.Link as={Link} to="/">Chat Place</Nav.Link>
        <Nav.Link as={Link} to="/login">Login page</Nav.Link>
        <Nav.Link as={Link} to="/signup">Signup page</Nav.Link>
      </Navbar>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path={linkToLogin} element={<LoginPage />} />
          <Route path={lintToSignup} element={<SignupPage />} />
          <Route
            path={linkToChat}
            element={(
              <ChatRoute>
                <Provider store={store}>
                  <ChatPage />
                </Provider>
              </ChatRoute>
            )}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
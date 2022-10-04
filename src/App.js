import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react'

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import { AuthContext } from './components/store/auth-context';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;


  return (
    <Layout>

      <Routes>

        <Route path="/" element={<HomePage />} />

        {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />
        }


        {isLoggedIn && <Route path="/profile" element={<UserProfile />} />
        }

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

    </Layout>
  );
}

export default App;

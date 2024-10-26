import './App.css'
import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import ChatPage from './components/ChatPage.jsx'
import VerifyEmail from './utils/VerifyEmail.jsx'
import ProtectedRoutes from './utils/protectedRoutes.jsx'
import api from './interceptors/axios.js'

function App() {
  const navigate = useNavigate();

  useEffect(() => {

    api.get('/user/authUser')
      .then(res => {
        if (res.data.isAuthorized) {
          navigate('/chat');
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/chat' element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

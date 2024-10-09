import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import ChatPage from './components/ChatPage.jsx'
import VerifyEmail from './utils/VerifyEmail.jsx'
import ProtectedRoutes from './utils/protectedRoutes.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/chat' element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

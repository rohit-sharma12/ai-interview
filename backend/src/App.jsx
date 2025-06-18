import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import InterviewPrep from './pages/InterviewPrep'
import UserProvider from './context/userContext'

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />

            {/* <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              FontSize: '13px'
            }
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App

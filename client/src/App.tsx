
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import AccountVerify from './pages/AccountVerify'
import PublicRoutes from './ProtectRoutes/PublicRoutes'
import ProtectedRoutes from './ProtectRoutes/ProtectedRoutes'
import FindAccount from './pages/FindAccount'
import FindAccVerify from './pages/FindAccVerify'
import ResetPassword from './pages/ResetPasswors'
import UpdateUser from './pages/UpdateUser'
import Dashboard from './pages/Dashboard'
import Appeal from './pages/Appeal'


function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <section className='max-w-6xl mx-auto px-4'>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path='/signup' element={<PublicRoutes><Signup /></PublicRoutes>} />
          <Route path='/user/:id' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path='/update/:id' element={<ProtectedRoutes><UpdateUser /></ProtectedRoutes>} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path='/account_verify' element={<ProtectedRoutes><AccountVerify /></ProtectedRoutes>} />
          <Route path='/find_account' element={<FindAccount />} />
          <Route path='/otp_verify' element={<FindAccVerify />} />
          <Route path='/account-appeal' element={<Appeal />} />
          <Route path='/reset_password' element={<ResetPassword />} />
        </Routes>
      </section>
    </BrowserRouter >

  )
}

export default App

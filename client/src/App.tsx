
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AccountVerify from './pages/AccountVerify'
import PublicRoutes from './ProtectRoutes/PublicRoutes'
import ProtectedRoutes from './ProtectRoutes/ProtectedRoutes'
import FindAccount from './pages/FindAccount'
import FindAccVerify from './pages/FindAccVerify'
import ResetPassword from './pages/ResetPasswors'
import UpdateUser from './pages/UpdateUser'
import Dashboard from './pages/Dashboard'
import Appeal from './pages/Appeal'
import NavBar from './components/NavBar'


function App() {

  const location = useLocation()
  const hideNavBarPaths = ['/login', '/signup', 'otp_verify', '/account-appeal', '/reset_password']
  const showNavBar = !hideNavBarPaths.includes(location.pathname)
  return (

    <section className='max-w-6xl mx-auto px-4'>
      {
        showNavBar && <NavBar />
      }
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


  )
}

export default App

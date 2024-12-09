import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from "./store/useAuthStore"
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "./store/UseThemeStore"



function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className = "size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser? <SignupPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/profile" element={authUser? <Profile /> : <Navigate to="/login"/>}/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App

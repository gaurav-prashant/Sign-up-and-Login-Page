import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'
import AuthSuccess from './pages/AuthSuccess'
import CreateTodo from './pages/CreateTodo'   // 👈 ADD THIS

const router = createBrowserRouter([

  // Home Page (Protected)
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },

  // Create Todo Page (Protected)
  {
    path: '/create-todo',
    element: (
      <ProtectedRoute>
        <Navbar />
        <CreateTodo />
      </ProtectedRoute>
    )
  },

  // Auth Pages (Public)
  {
    path: '/signup',
    element: <Signup />
  },

  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/verify',
    element: <VerifyEmail />
  },

  {
    path: '/verify/:token',
    element: <Verify />
  },

  {
    path: '/auth-success',
    element: <AuthSuccess />
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },

  {
    path: '/verify-otp/:email',
    element: <VerifyOTP />
  },

  {
    path: '/change-password/:email',
    element: <ChangePassword />
  },

  // 404 Page
  {
    path: '*',
    element: <h2 style={{ textAlign: "center", marginTop: "50px" }}>404 Page Not Found</h2>
  }

])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App

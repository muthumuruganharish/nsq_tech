import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import AdminPanel from './Pages/AdminPanel'
import Signup from './Pages/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  )
}

export default App



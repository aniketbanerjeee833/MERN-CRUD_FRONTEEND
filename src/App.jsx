import React from 'react'
import Home from './Home/Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'
import Edit from './Pages/Edit/Edit'
import "./App.css"
export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/edit/:id" element={<Edit/>}/>
    <Route path="/userprofile/:id" element={<Profile/>}/>
  </Routes>
  </BrowserRouter>
  )
}

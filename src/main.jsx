import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AddDataProvider } from './Components/Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddDataProvider>
    <App />
    </AddDataProvider>
   
  </React.StrictMode>,
)

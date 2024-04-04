import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "./global.css";
import "./assets/icon/bootstrap-icons.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
)

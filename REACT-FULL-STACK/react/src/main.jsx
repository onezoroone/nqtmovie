import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx';
import './assets/css/owl.carousel.min.css';
import './assets/css/owl.theme.default.min.css';
import '../src/assets/js/owl.carousel.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)

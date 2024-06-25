import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer /> {/* Make sure to include this */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


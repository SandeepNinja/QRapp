import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
        
          <App />
      </AuthProvider>
    </ToastProvider>
  )

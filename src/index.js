import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/manrope';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = process.env.REACT_APP_GG__CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <BrowserRouter basename="/">
          <Provider store={store}>
               <GoogleOAuthProvider clientId={clientID}>
                    <React.StrictMode>
                         <App />
                    </React.StrictMode>
               </GoogleOAuthProvider>
          </Provider>
     </BrowserRouter>,
);

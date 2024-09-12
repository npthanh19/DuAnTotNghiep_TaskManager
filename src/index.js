import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/manrope';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <BrowserRouter basename="/">
          <Provider store={store}>
               <React.StrictMode>
                    <App />
               </React.StrictMode>
          </Provider>
     </BrowserRouter>,
);

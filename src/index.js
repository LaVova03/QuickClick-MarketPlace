import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import AppRouter from './router';
import store from './store';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Logo from './assets/main/logo.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Helmet>
          <link rel="icon" href={Logo} />
        </Helmet>
        <AppRouter />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

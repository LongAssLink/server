import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './routes/error';
import Layout from './routes/root';

import './index.css';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        async lazy() {
          const { default: Component } = await import('./routes/home');
          return { Component };
        }
      },
      {
        path: '/s/:slug',
        async lazy() {
          const { default: Component, loader } = await import(
            './routes/shortLink'
          );

          return { Component, loader };
        }
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);

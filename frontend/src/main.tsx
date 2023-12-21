import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    async lazy() {
      const { default: Layout } = await import('./routes/root');
      return { Component: Layout };
    },
    children: [
      {
        path: '/',
        async lazy() {
          return import('./routes/home').then(m => ({ Component: m.default }));
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

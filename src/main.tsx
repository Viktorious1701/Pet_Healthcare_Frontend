import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.ts'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Route/Routes.tsx'


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.ts'

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <Provider store={store}>
      <React.StrictMode>
      <App />
    </React.StrictMode>,
    </Provider>
  </NextUIProvider>

)

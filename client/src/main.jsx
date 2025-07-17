import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'  

// export the url which come from backend to send to axios to call the api ---this is the first things to doo before call api
export const serverURL="http://localhost:5000"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />  
  </Provider>
   
  </BrowserRouter>,
)

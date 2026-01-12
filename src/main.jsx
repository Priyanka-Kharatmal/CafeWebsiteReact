import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/CartContext.jsx'
import { SearchProvider } from './components/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
    <SearchProvider>
    <App />
    </SearchProvider>
    </CartProvider>
  </BrowserRouter>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './Components/Navbar.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router}/>
  </StrictMode>,
)

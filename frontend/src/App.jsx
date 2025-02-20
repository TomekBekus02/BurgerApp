import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '../styles/app.css'
import RootLayout from './route/RootLayout'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {path: 'home', element: <Home />},
    ]
  },
  {
    path: '/admin',
    element: <RootLayout />,
    children: [
      {path: 'home', element: <Home />},
      {path: 'add-product', element: <AddProduct/>}
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}
export default App

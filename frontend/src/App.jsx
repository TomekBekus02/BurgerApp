import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

import '../styles/app.css'
import RootLayout from './route/RootLayout'
import AddProduct from './pages/AddProduct'
import AddTopping from './pages/AddToppings'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
import EditProduct from './pages/EditProduct'
import ModifyTopping from './pages/ModifyTopping'




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {path: '', element: <Home />},
    ]
  },
  {
    path: '/admin',
    element: <RootLayout />,
    children: [
      {path: 'admin-home', element: <AdminHome />},
      {path: 'add-product', element: <AddProduct/>},
      {path: 'add-topping/:productId', element: <AddTopping/>},
      {path: 'edit-product/:productId', element: <EditProduct/>},
      {path: 'modify-topping/:productId', element: <ModifyTopping/>}
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>
}
export default App

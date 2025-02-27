import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './MainLayout/RootLayout/RootLayout'
import AddProduct from './pages/Admin/AddProduct/AddProduct'
import AddTopping from './pages/Admin/AddTopping/AddToppings'
import Home from './pages/User/Home/Home'
import AdminHome from './pages/Admin/AdminHome/AdminHome'
import EditProduct from './pages/Admin/EditProduct/EditProduct'
import ModifyProductToppings from './pages/Admin/ModifyProductToppings/ModifyProductToppings'
import EditTopping from './pages/Admin/EditProduct/EditProduct'

import './styles/App.css'
//import { router } from './MainLayout/RootLayout/RouterRoutes'

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
      {path: 'modify-topping/:productId', element: <ModifyProductToppings/>},
      {path: 'edit-topping/:productId/:toppingId', element: <EditTopping/>},
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}
export default App

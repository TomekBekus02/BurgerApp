import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import AddProduct from '../../pages/Admin/AddProduct/AddProduct'
import AddTopping from '../../pages/Admin/AddTopping/AddToppings'
import Home from '../../pages/User/Home/Home'
import AdminHome from '../../pages/Admin/AdminHome/AdminHome'
import EditProduct from '../../pages/Admin/EditProduct/EditProduct'
import ModifyProductToppings from '../../pages/Admin/ModifyProductToppings/ModifyProductToppings'
import EditTopping from '../../pages/Admin/EditTopping/EditTopping'

export const router = createBrowserRouter([
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
        {path: 'edit-topping/:productId/:toppingId', element: <EditTopping/>},
        {path: 'edit-product/:productId', element: <EditProduct/>},
        {path: 'modify-topping/:productId', element: <ModifyProductToppings/>},
      ]
    }
])
import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './RootLayout'
import AdminRootLayout from '../AdminRootLayout/AdminRootLayout'
import AddProduct from '../../pages/Admin/AddProduct/AddProduct'
import AddTopping from '../../pages/Admin/AddTopping/AddToppings'
import Home from '../../pages/User/Home/Home'
import AdminHome from '../../pages/Admin/AdminHome/AdminHome'
import EditProduct from '../../pages/Admin/EditProduct/EditProduct'
import ModifyProductToppings from '../../pages/Admin/ModifyProductToppings/ModifyProductToppings'
import EditTopping from '../../pages/Admin/EditTopping/EditTopping'
import Login from '../../pages/User/Login/Login'
import SignUp from '../../pages/User/SignUp/SignUp'
import Delivery from '../../pages/User/Order/Delivery/Delivery'
import ErrorPage from '../../pages/Error/ErrorPage'
import Payment from '../../pages/User/Order/Payment/Payment'
import Summary from '../../pages/User/Order/Summary/Summary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/sign-up', element: <SignUp /> },
    ]
  },
  {
    path: '/order',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/order/delivery" replace /> },
      { path: 'delivery', element: <Delivery /> },
      { path: 'payments', element: <Payment /> },
      { path: 'summary', element: <Summary /> },
    ]
  },
  {
    path: '/admin',
    element: <AdminRootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'admin-home', element: <AdminHome /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'add-topping/:productId', element: <AddTopping /> },
      { path: 'edit-topping/:productId/:toppingId', element: <EditTopping /> },
      { path: 'edit-product/:productId', element: <EditProduct /> },
      { path: 'modify-topping/:productId', element: <ModifyProductToppings /> },
    ]
  },

])
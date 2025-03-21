import { RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { router } from './MainLayout/RootLayout/RouterRoutes'
import { AuthProvider } from './Contexts/AuthContext';
import { CartProvider } from './Contexts/UserCartContext'
import { OrderProvider } from './Contexts/UserOrderContex';


function App() {

  return (
    <OrderProvider>
      <CartProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CartProvider>
    </OrderProvider>
  )
}
export default App

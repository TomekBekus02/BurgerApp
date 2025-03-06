import { RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './styles/App.css'
import { router } from './MainLayout/RootLayout/RouterRoutes'
import { AuthProvider } from './Contexts/AuthContext';


function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}
export default App

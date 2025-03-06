import { RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './styles/App.css'
import { router } from './MainLayout/RootLayout/RouterRoutes'
import { createContext, useState } from 'react';

const LoginContext = createContext(null);
function App() {
  const [isUserLoggedIn, setIisUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIisAdminLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{isUserLoggedIn, setIisUserLoggedIn, isAdminLoggedIn, setIisAdminLoggedIn}}>
      <RouterProvider router={router}/>
    </LoginContext.Provider>
  )
}
export default App

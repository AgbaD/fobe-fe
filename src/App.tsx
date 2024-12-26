import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Register from "./components/modules/app/register";
import Login from "./components/modules/app/login";
import Dashboard from "./components/modules/app/dashboard";

import { useAuthContext } from "./components/context/authContext";
import Wallet from "./components/modules/app/wallet";


function App() {
  const { token } = useAuthContext();
  const isAuthenticated = Boolean(token);
  return (
    // prettier-ignore
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} /> 

        {/* protected route */}
        {/* if is authenticated render these routes */}
        {
        isAuthenticated ? <>  
        <Route path="/" element={<Dashboard />} />    
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Redirect to="/" />} />
        </> : 
        <Route path="/login" element={<Login />} /> 
        }

        <Route path="/*" element={<Redirect />} />

      </Routes>
    </BrowserRouter>
  );
}

function Redirect({ to }: { to?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(to ?? `/login?to=${location.pathname}`);
  }, []);
  return null;
}

export default App;

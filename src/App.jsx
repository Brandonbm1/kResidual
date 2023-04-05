import "./styles/css/index.css";
import { ProponentContextProvider } from "./context/ProponentsContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./router/ProtectedRoutes";
import AuthRoutes from "./router/AuthRoutes";
import { useEffect } from "react";
const App = () => {
  return (
    <AuthContextProvider>
      <ProponentContextProvider>
        <Routes>
          <Route
            index
            path="/kResidual"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/kResidual/login"
            element={
              <AuthRoutes>
                <Login />
              </AuthRoutes>
            }
          />
          <Route
            path="/kResidual/register"
            element={
              <AuthRoutes>
                <Register />
              </AuthRoutes>
            }
          />
        </Routes>
      </ProponentContextProvider>
    </AuthContextProvider>
  );
};

export default App;

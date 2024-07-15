import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppRoutes from "./Routes/AppRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart/Cart";
import EvOAdminHeader from "./components/EvOAdminHeader";
import { ToastContainer } from "react-toastify";

const ConditionalLayout = () => {
  const location = useLocation();
  const { role } = useAuth();

  const noHeaderFooterPaths = ["/signin", "/signup", "/transactioninfo"];

  const noCartPaths = [
    "/signin",
    "/signup",
    "/transactioninfo",
    "/checkout",
    "/operatorPages",
    "/createEventType",
    "/create-event",
    "/update-event/:eventId",
    "/edit-eventDetails/:eventId",
  ];

  const operatorPaths = [
    "/operatorPages",
    "/createEventType",
    "/create-event",
    "/update-event/:eventId",
  ];

  const adminPaths = ["/adminPages"];

  const matchPath = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const isOperatorOrAdminPath =
    matchPath(operatorPaths) || matchPath(adminPaths);

  const headerComponent = role === "EVENTOPERATOR" ? (
    <EvOAdminHeader />
  ) : (
    <Header />
  );

  return (
    <div>
      {!matchPath(noHeaderFooterPaths) && headerComponent}
      <AppRoutes />
      {!matchPath(noHeaderFooterPaths) && !isOperatorOrAdminPath && <Footer />}
      {!matchPath(noCartPaths) && role === "VISITOR" && <Cart />}
      <ToastContainer /> {/* Ensure ToastContainer is present here */}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ConditionalLayout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

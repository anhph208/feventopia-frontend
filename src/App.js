import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/userprofile";
import StaffProfile from "./pages/staffprofile";

// Create a new component to handle conditional rendering
const ConditionalLayout = () => {
  const location = useLocation();

  return (
    <div>
      {/* Render Header only if not on SignIn or SignUp pages */}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <Header />}

      {/* Render content (Routes) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
      </Routes>

      {/* Render Footer only if not on SignIn or SignUp pages */}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ConditionalLayout /> 
    </BrowserRouter>
  );
}

export default App;

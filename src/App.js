import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/userprofile";
import StaffProfile from "./pages/staffprofile";
import FAQ from "./pages/faq";
import helpArticleDetailView from "./pages/help_article_detail_view";
import helpCenterKnowledgeBase from "./pages/help_center_knowledge_base";
import helpSectionDetailView from "./pages/help_section_detail_view";
import helpCenter from "./pages/help_center";
import createEvent from "./pages/createEvent";


// Create a new component to handle conditional rendering
const ConditionalLayout = () => {
  const location = useLocation();


  return (
    <div>
      {/* Render Header only if not on SignIn or SignUp pages */}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <Header />}

      {/* Render content (Routes) */}
      <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/staffprofile" element={<StaffProfile />} />
          <Route path="/createEvent" element={<createEvent />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/helpSectionDetailView" element={<helpSectionDetailView />} />
          <Route path="/helpCenter" element={<helpCenter />} />
          <Route path="/helpCenterKnowledgeBase" element={<helpCenterKnowledgeBase />} />
          <Route path="/helpArticleDetailView" element={<helpArticleDetailView />} />
          <Route path="/CreateEvent" element={<createEvent />} />
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

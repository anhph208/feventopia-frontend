import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
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
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/userprofile";
import StaffProfile from "./pages/staffprofile";
import FAQ from "./pages/faq";
import HelpArticleDetailView from "./pages/help_article_detail_view";
import HelpCenterKnowledgeBase from "./pages/help_center_knowledge_base";
import HelpSectionDetailView from "./pages/help_section_detail_view";
import HelpCenter from "./pages/help_center";
import TransactionInfo from "./pages/transaction";

// Create a new component to handle conditional rendering
const ConditionalLayout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ["/signin", "/signup", "/transactioninfo"]; // Paths where Header and Footer should not be rendered

  return (
    <div>
      {/* Render Header only if not on specific pages */}
      {!noHeaderFooterPaths.includes(location.pathname) && <Header />}

      {/* Render content (Routes) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/helpSectionDetailView" element={<HelpSectionDetailView />} />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route path="/helpCenterKnowledgeBase" element={<HelpCenterKnowledgeBase />} />
        <Route path="/helpArticleDetailView" element={<HelpArticleDetailView />} />
        <Route path="/transactioninfo" element={<TransactionInfo />} />
      </Routes>

      {/* Render Footer only if not on specific pages */}
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
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

import React from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/userprofile";
import FAQ from "./pages/faq";
import HelpArticleDetailView from "./pages/help_article_detail_view";
import HelpCenterKnowledgeBase from "./pages/help_center_knowledge_base";
import HelpSectionDetailView from "./pages/help_section_detail_view";
import HelpCenter from "./pages/help_center";
import TransactionInfo from "./pages/transaction";
import ExploreEvent from "./components/exploreEvent";
import Privacy_policy from "./pages/privacy";
import AboutUs from "./pages/About";
import Contact_us from "./pages/Contact";
import Terms_condition from "./pages/terms_condition";
import Invoice from "./pages/invoice";
import Staffprofile from "./pages/staffprofile";
import Dashboard from "./pages/OperatorPages/dashboard";
import AdminDashboard from "./pages/adminPage/adminDashboard";
import Error_404 from "./components/error_404";
import ScanQR from "./components/ScanQR";
import Feedback from "./pages/feedback";
import FeedbackDetail from "./pages/feedbackDetail";

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
        <Route path="/faq" element={<FAQ />} />
        <Route path="/helpSectionDetailView" element={<HelpSectionDetailView />} />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route path="/helpCenterKnowledgeBase" element={<HelpCenterKnowledgeBase />} />
        <Route path="/helpArticleDetailView" element={<HelpArticleDetailView />} />
        <Route path="/transactioninfo" element={<TransactionInfo />} />
        <Route path="/exploreEvent" element={<ExploreEvent />} />
        <Route path="/privacy" element={<Privacy_policy />} />
        <Route path="/About_us" element={<AboutUs />} />
        <Route path="/Contact_us" element={<Contact_us />} />
        <Route path="/Term_and_condition" element={<Terms_condition />} />
        <Route path="/Invoice" element={<Invoice />} />
        <Route path="/Staffprofile" element={<Staffprofile />} />
        <Route path="/checkin" element={<ScanQR />} />        
        <Route path="/Feedback" element={<Feedback />} />        
        <Route path="/FeedbackDetail" element={<FeedbackDetail />} />        
        <Route
          path="/AdminDashboard"
          element={<PrivateRoute element={AdminDashboard} allowedRoles={['ADMIN']} />}
        />
          <Route
          path="/OperatorDashboard"
          element={<PrivateRoute element={Dashboard} allowedRoles={['EVENTOPERATOR']} />}
        />
        <Route path="/error_404" element={<Error_404 />} />
      </Routes>
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

// PrivateRoute component
const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const location = useLocation();
  const userRole = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/error_404" replace />;
  }

  return <Component />;
};

function App() {
  return (
    <BrowserRouter>
      <ConditionalLayout />
    </BrowserRouter>
  );
}

export default App;

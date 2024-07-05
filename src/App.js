import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/userprofile";
import StaffProfile from "./pages/staffprofile";
import ExploreEvent from "./components/exploreEvent";
import FAQ from "./pages/faq";
import HelpArticleDetailView from "./pages/help_article_detail_view";
import HelpCenterKnowledgeBase from "./pages/help_center_knowledge_base";
import HelpSectionDetailView from "./pages/help_section_detail_view";
import HelpCenter from "./pages/help_center";
import TransactionInfo from "./pages/transaction";
import EventDetails from "./pages/eventDetails";
import Checkout from "./pages/checkout";
import BookingConfirm from "./pages/bookingConfirm";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const ConditionalLayout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ["/signin", "/signup", "/transactioninfo"];
  const noCartPaths = ["/signin", "/signup", "/transactioninfo", "/checkout"];

  return (
    <div>
      <CartProvider>
        {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/staffprofile" element={<StaffProfile />} />
          <Route path="/explored" element={<ExploreEvent />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/helpSectionDetailView" element={<HelpSectionDetailView />} />
          <Route path="/helpCenter" element={<HelpCenter />} />
          <Route path="/helpCenterKnowledgeBase" element={<HelpCenterKnowledgeBase />} />
          <Route path="/helpArticleDetailView" element={<HelpArticleDetailView />} />
          <Route path="/transactioninfo" element={<TransactionInfo />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking_confirmed" element={<BookingConfirm />} />
        </Routes>
        {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
        {!noCartPaths.includes(location.pathname) && <Cart />}
        <ToastContainer /> {/* Ensure ToastContainer is present here */}
      </CartProvider>
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

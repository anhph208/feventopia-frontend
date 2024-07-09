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
import ExploreEvent from "./components/searchEvent";
import FAQ from "./components/Help-Support/faq";
import HelpArticleDetailView from "./components/Help-Support/help_article_detail_view";
import HelpCenterKnowledgeBase from "./components/Help-Support/help_center_knowledge_base";
import HelpSectionDetailView from "./components/Help-Support/help_section_detail_view";
import HelpCenter from "./components/Help-Support/help_center";
import TransactionInfo from "./pages/transaction";
import LocationPage from "./pages/locationPage";
import LocationDetailPage from "./pages/locationDetail";
import EventDetails from "./pages/eventDetails";
import Checkout from "./pages/checkout";
import BookingConfirm from "./pages/bookingConfirm";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import OperatorPages from "./components/OperatorPages/OperatorMain";
import EvOAdminHeader from "./components/EvOAdminHeader"; // Import EvOAdminHeader
import CreateEvent from "./components/OperatorPages/EventType/createEvent";
import CreateEventOnl from "./components/OperatorPages/EventType/onlineEvent"

const ConditionalLayout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ["/signin", "/signup", "/transactioninfo", "/operatorPages"];
  const noCartPaths = ["/signin", "/signup", "/transactioninfo", "/checkout", "/operatorPages"];
  const operatorPaths = ["/operatorPages"]; // Define operator-specific paths
  const adminPaths = ["/adminPages"]; // Define admin-specific paths

  const isOperatorOrAdminPath = operatorPaths.includes(location.pathname) || adminPaths.includes(location.pathname);

  let headerComponent = <Header />;
  if (isOperatorOrAdminPath) {
    headerComponent = <EvOAdminHeader />;
  }

  return (
    <div>
      {!noHeaderFooterPaths.includes(location.pathname) && headerComponent}
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
        <Route path="/operatorPages" element={<OperatorPages />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/create-online-event" element={<CreateEventOnl />} />
        {/* Add a route for admin pages if needed */}
        <Route path="/locations" element={<LocationPage />}/>
        <Route path="/locations/:id" element={<LocationDetailPage />}/>
      </Routes>
      {!noHeaderFooterPaths.includes(location.pathname) && !isOperatorOrAdminPath && <Footer />}
      {!noCartPaths.includes(location.pathname) && <Cart />}
      <ToastContainer /> {/* Ensure ToastContainer is present here */}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ConditionalLayout />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

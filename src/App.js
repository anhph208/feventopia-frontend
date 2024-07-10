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
import FAQ from "./pages/Help-Support/faq";
import HelpArticleDetailView from "./pages/Help-Support/help_article_detail_view";
import HelpCenterKnowledgeBase from "./pages/Help-Support/help_center_knowledge_base";
import HelpSectionDetailView from "./pages/Help-Support/help_section_detail_view";
import HelpCenter from "./pages/Help-Support/help_center";
import TransactionInfo from "./pages/transaction";
import EventDetails from "./pages/eventDetails";
import Checkout from "./pages/checkout";
import BookingConfirm from "./pages/bookingConfirm";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import OperatorPages from "./pages/OperatorPages/OperatorMain";
import EvOAdminHeader from "./components/EvOAdminHeader"; // Import EvOAdminHeader
import CreateEvent from "./pages/OperatorPages/EventType/createEvent";
import CreateEventOnl from "./pages/OperatorPages/EventType/createEvent"
import { AuthProvider } from "./components/Route/AuthContext";
import PrivateRoute from "./components/Route/PrivateRoute";
import Error_404 from "./components/error_404";
import CheckinTicket from "./pages/EventCheckin";
import Contact_us from "./pages/Contact";
import EventAnalysis from "./pages/OperatorPages/Analysis";

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
        <Route path="/operatorPages"
         element={<PrivateRoute element={OperatorPages} allowedRoles={['EVENTOPERATOR', 'ADMIN']} />}/>
        <Route path="/createEvent" element={<CreateEvent />} />        
        <Route path="/create-online-event" element={<CreateEventOnl />} />
        <Route path="/error_404" element={<Error_404 />} />
        <Route path="/Checkin"
         element={<PrivateRoute element={CheckinTicket} allowedRoles={['CHECKINGSTAFF']} />}/>
         <Route path="/Analysis"
         element={<PrivateRoute element={EventAnalysis} allowedRoles={['EVENTOPERATOR']} />}/>
        <Route path="/Contact" element={<Contact_us />} />

        {/* Add a route for admin pages if needed */}
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
        <AuthProvider>
          <ConditionalLayout />
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

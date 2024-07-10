import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
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
import LocationPage from "./pages/locationPage";
import LocationDetailPage from "./pages/locationDetail";
import EventDetails from "./pages/eventDetails";
import Checkout from "./pages/checkout";
import CheckoutStall from "./pages/checkoutStall";
import BookingConfirm from "./pages/bookingConfirm";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import OperatorPages from "./pages/OperatorPages/OperatorMain";
import EvOAdminHeader from "./components/EvOAdminHeader";
import CreateEventType from "./pages/OperatorPages/EventType/createEventType";
import CreateEvent from "./pages/OperatorPages/EventType/createEvent";
import UpdateEvent from "./pages/OperatorPages/EventType/updateEvent";
import EventDetailsEdit from "./pages/OperatorPages/EventDetail-Editmode";
import NotFound from "./components/error_404";
import CheckinTicket from "./pages/EventCheckin";
import ContactUs from "./pages/Contact";
// import EventAnalysis from "./pages/OperatorPages/Analysis";

const ConditionalLayout = () => {
  const location = useLocation();

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

  const headerComponent = isOperatorOrAdminPath ? (
    <EvOAdminHeader />
  ) : (
    <Header />
  );

  return (
    <div>
      {!matchPath(noHeaderFooterPaths) && headerComponent}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/explored" element={<ExploreEvent />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/helpSectionDetailView"
          element={<HelpSectionDetailView />}
        />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route
          path="/helpCenterKnowledgeBase"
          element={<HelpCenterKnowledgeBase />}
        />
        <Route
          path="/helpArticleDetailView"
          element={<HelpArticleDetailView />}
        />
        <Route path="/transactioninfo" element={<TransactionInfo />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkoutstall" element={<CheckoutStall />} />
        <Route path="/booking_confirmed" element={<BookingConfirm />} />
        <Route path="/operatorPages" element={<OperatorPages />} />
        <Route path="/createEventType" element={<CreateEventType />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/update-event/:eventId" element={<UpdateEvent />} />
        <Route
          path="/edit-eventDetails/:eventId"
          element={<EventDetailsEdit />}
        />
        <Route path="/error_404" element={<NotFound />} />
        <Route path="/Checkin" element={<CheckinTicket />} />
        {/* <Route path="/Analysis" element={<EventAnalysis />} /> */}
        <Route path="/Contact" element={<ContactUs />} />
        {/* Add a route for admin pages if needed */}
        <Route path="/locations" element={<LocationPage />}/>
        <Route path="/locations/:id" element={<LocationDetailPage />}/>
      </Routes>
      {!matchPath(noHeaderFooterPaths) && !isOperatorOrAdminPath && <Footer />}
      {!matchPath(noCartPaths) && <Cart />}
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

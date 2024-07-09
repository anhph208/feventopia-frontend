import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header";
import EvOAdminHeader from "../EvOAdminHeader";
import Footer from "../Footer";
import Home from "../../pages/home";
import SignIn from "../../pages/signin";
import SignUp from "../../pages/signup";
import UserProfile from "../../pages/userprofile";
import StaffProfile from "../../pages/staffprofile";
import ExploreEvent from "../searchEvent";
import FAQ from "../Help-Support/faq";
import HelpArticleDetailView from "../Help-Support/help_article_detail_view";
import HelpCenterKnowledgeBase from "../Help-Support/help_center_knowledge_base";
import HelpSectionDetailView from "../Help-Support/help_section_detail_view";
import HelpCenter from "../Help-Support/help_center";
import TransactionInfo from "../../pages/transaction";
import EventDetails from "../../pages/eventDetails";
import Checkout from "../../pages/checkout";
import BookingConfirm from "../../pages/bookingConfirm";
import Cart from "../Cart/Cart";
import OperatorPages from "../OperatorPages/OperatorMain";
import CreateEvent from "../OperatorPages/EventType/createEvent";
import NotFound from "../error_404";

const AppRoutes = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const noHeaderFooterPaths = [
    "/signin",
    "/signup",
    "/transactioninfo",
    "/operatorPages",
    "/createEvent",
  ];
  const noCartPaths = [
    "/signin",
    "/signup",
    "/transactioninfo",
    "/checkout",
    "/operatorPages",
    "/createEvent",
  ];

  const isOperatorOrAdminPath = ["/operatorPages", "/createEvent"].includes(
    location.pathname
  );

  const headerComponent =
    isOperatorOrAdminPath && (role === "EVENTOPERATOR" || role === "ADMIN") ? (
      <EvOAdminHeader />
    ) : (
      <Header />
    );

  return (
    <>
      {!noHeaderFooterPaths.includes(location.pathname) && headerComponent}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/userprofile"
          element={role ? <UserProfile /> : <SignIn />}
        />
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
        <Route path="/booking_confirmed" element={<BookingConfirm />} />
        {(role === "EVENTOPERATOR" || role === "ADMIN") && (
          <>
            <Route path="/operatorPages" element={<OperatorPages />} />
            <Route path="/createEvent" element={<CreateEvent />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      {!noCartPaths.includes(location.pathname) && <Cart />}
    </>
  );
};

export default AppRoutes;

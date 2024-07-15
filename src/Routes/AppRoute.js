import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../context/ProtectedRoute";
import Home from "../pages/home";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import UserProfile from "../pages/userprofile";
import ExploreEvent from "../components/searchEvent";
import FAQ from "../pages/Help-Support/faq";
import HelpArticleDetailView from "../pages/Help-Support/help_article_detail_view";
import HelpCenterKnowledgeBase from "../pages/Help-Support/help_center_knowledge_base";
import HelpSectionDetailView from "../pages/Help-Support/help_section_detail_view";
import HelpCenter from "../pages/Help-Support/help_center";
import TransactionInfo from "../pages/transaction";
import EventDetails from "../pages/eventDetails";
import Checkout from "../pages/checkout";
import CheckoutStall from "../pages/checkoutStall";
import BookingConfirm from "../pages/bookingConfirm";
import OperatorPages from "../pages/OperatorPages/OperatorMain";
import CreateEventType from "../pages/OperatorPages/EventType/createEventType";
import CreateEvent from "../pages/OperatorPages/EventType/createEvent";
import UpdateEvent from "../pages/OperatorPages/EventType/updateEvent";
import EventDetailsEdit from "../pages/OperatorPages/EventDetail-Editmode";
import NotFound from "../components/error_404";
import ContactUs from "../pages/Contact";
import EventAssignees from "../pages/OperatorPages/EventAssignee";
import EventSponsorship from "../pages/SponsorPages/EventSponsor";
import SponsorProfile from "../pages/sponsorProfile";
import DashboardTab from "../pages/OperatorPages/DashboardTab";
import StaffProfile from "../pages/StaffPages/StaffProfile";

const AppRoutes = () => {
  const { role } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explored" element={<ExploreEvent />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/helpSectionDetailView" element={<HelpSectionDetailView />} />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route path="/helpCenterKnowledgeBase" element={<HelpCenterKnowledgeBase />} />
        <Route path="/helpArticleDetailView" element={<HelpArticleDetailView />} />
        <Route path="/transactioninfo" element={<TransactionInfo />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />

        {role === "VISITOR" && (
          <>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkoutstall" element={<CheckoutStall />} />
            <Route path="/booking_confirmed" element={<BookingConfirm />} />
          </>
        )}

        {role === "SPONSOR" && (
          <>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/sponsorProfile" element={<SponsorProfile />} />
            <Route path="/sponsor-event/:eventId" element={<EventSponsorship />} />
          </>
        )}

        {role === "CHECKINGSTAFF" && (
          <>
            <Route path="/staffprofile" element={<ProtectedRoute element={<StaffProfile />} />} />
            <Route path="/*" element={<Navigate to="/staffprofile" />} />
          </>
        )}

        {role === "EVENTOPERATOR" && (
          <>
            <Route path="/operatorPages" element={<OperatorPages />} />
            <Route path="/createEventType" element={<CreateEventType />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/update-event/:eventId" element={<UpdateEvent />} />
            <Route path="/edit-eventDetails/:eventId" element={<EventDetailsEdit />} />
            <Route path="/event-assignees/:eventId" element={<EventAssignees />} />
            <Route path="/dashboard/:eventId" element={<DashboardTab />} />
            <Route path="/*" element={<Navigate to="/operatorPages" />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};


export default AppRoutes;

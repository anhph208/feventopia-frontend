import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/Cart/CartContext";

export const convertToGMT7 = (dateTimeString) => {
  const [datePart, timePart] = decodeURIComponent(dateTimeString).split(" ");
  const [month, day, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(":");
  const date = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds)
  );
  date.setHours(date.getHours() + 7);
  const formattedDate = date.toISOString().replace("T", " ").substring(0, 19);
  return formattedDate;
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
};

export const PriceFormat = ({ price }) => {
  if (price === undefined || price === null || isNaN(price)) {
    return <span>N/A</span>; // Display a placeholder or handle as needed
  }

  const formattedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return <span>{formattedPrice}</span>;
};

export const formatTime = (date) => {
  if (!date) return "";
  const formattedTime = new Date(date).toLocaleTimeString();
  return formattedTime;
};

export const formatDateTime = (date) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formattedDate.getFullYear();
  const hours = formattedDate.getHours().toString().padStart(2, "0");
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const calculateTimeAgo = (datetime) => {
  const currentDate = new Date();
  const pastDate = new Date(datetime);
  const timeDifference = currentDate - pastDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `vài giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else {
    return `${days} ngày trước`;
  }
};

export const handleLogout = (navigate, clearCart) => {
  localStorage.removeItem("isLogged");
  localStorage.removeItem("username");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("name");
  localStorage.removeItem("address");
  localStorage.removeItem("avatar");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  toast.success("Đăng xuất thành công!");
};

export const rankSub = (rank) => {
  if (rank === "BRONZE") {
    return "Hạng ĐỒNG";
  } else if (rank === "SILVER") {
    return "Hạng BẠC";
  } else if (rank === "GOLD") {
    return "Hạng VÀNG";
  } else if (rank === "PLATINUM") {
    return "Hạng BẠCH KIM";
  }
};

export const StatusSub = (status) => {
  if (status === "INITIAL") {
    return "GIAI ĐOẠN KHỞI ĐỘNG";
  } else if (status === "FUNDRAISING") {
    return "GIAI ĐOẠN GỌI TÀI TRỢ";
  } else if (status === "PREPARATION") {
    return "GIAI ĐOẠN CHUẨN BỊ";
  } else if (status === "EXECUTE") {
    return "TRIỂN KHAI SỰ KIỆN";
  } else if (status === "POST") {
    return "HOÀN THÀNH";
  } else if (status === "CANCELED") {
    return "ĐÃ HỦY";
  }
};

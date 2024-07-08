// NavigateWithDelay.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useNavigateWithDelay = () => {
  const navigate = useNavigate();

  const navigateWithDelay = (path, delay = 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        navigate(path);
        resolve();
      }, delay);
    });
  };

  return navigateWithDelay;
};

const NavigateWithDelay = ({ to, delay, children }) => {
  const navigateWithDelay = useNavigateWithDelay();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== to) {
      navigateWithDelay(to, delay);
    }
  }, [to, delay, location.pathname, navigateWithDelay]);

  return children;
};

export default NavigateWithDelay;

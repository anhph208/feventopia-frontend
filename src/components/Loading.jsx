import React from 'react';

function Loading() {
  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  };

  const spinnerStyle = {
    border: '16px solid #f3f3f3', // Light grey
    borderTop: '16px solid #3498db', // Blue
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
    marginBottom: '20px'
  };

  const headingStyle = {
    fontSize: '2em',
    color: '#333'
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={spinnerStyle}></div>
      <h1 style={headingStyle}>Loading...</h1>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loading;

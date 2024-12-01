import React from 'react';
import './not.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! The page you're looking for can't be found.</p>
      <div className="moving-elements">
        <span className="circle"></span>
        <span className="square"></span>
      </div>
    </div>
  );
};

export default NotFound;

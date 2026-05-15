import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-visual">
        <h1 className="not-found-code">404</h1>
        <div className="not-found-line" />
      </div>
      <div className="not-found-content">
        <h2 className="not-found-title">Lost in Architecture</h2>
        <p className="not-found-desc">
          The space you are looking for has been moved or does not exist in our current collection.
        </p>
        <Link to="/" className="back-home-btn interactive magnetic">
          <ArrowLeft size={18} />
          <span>Return to Atelier</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

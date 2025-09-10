import React from 'react';
import './BusinessCard.css';

const BusinessCard = ({
  logo,
  name,
  address,
  rating,
  services,
  onViewAll,
  onSchedule
}) => {
  return (
    <div className="business-card">
      <div className="business-header">
        <img src={logo} alt={name} className="business-logo" />
        <div className="business-info">
          <div className="business-name">{name}</div>
          <div className="business-address">{address}</div>
        </div>
        <div className="business-rating">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2e1e8f"
              width="22"
              height="22"
              className="star"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="business-services">
        <div className="services-header">
          <div className="services-title">SERVICIOS</div>
          <button className="view-all" onClick={onViewAll}>
            VER TODOS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="arrow-icon"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="services-list">
          {services.map((service, idx) => (
            <div className="service-item" key={idx}>
              <div>
                <div className="service-name">{service.name}</div>
                <div className="service-price">Desde Q{service.price}</div>
              </div>
              <button className="schedule-btn" onClick={() => onSchedule(service)}>
                Agendar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;

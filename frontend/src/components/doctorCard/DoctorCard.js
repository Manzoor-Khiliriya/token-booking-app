import React from 'react';
import { NavLink } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const remainingTokens = doctor.total_tokens - doctor.booked_tokens;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body text-center">
        <h5 className="card-title mb-2">{doctor.name}</h5>
        <p className="card-subtitle mb-3 text-muted">{doctor.speciality}</p>
        <span className={`badge ${remainingTokens > 0 ? 'bg-success' : 'bg-danger'}`}>
          {remainingTokens > 0
            ? `Available Tokens: ${remainingTokens}`
            : 'Fully Booked'}
        </span>
      </div>
      <div className="card-footer bg-transparent text-center">
        <NavLink
          to={`/doctor/${doctor._id}`}
          className="btn btn-outline-primary w-100"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default DoctorCard;

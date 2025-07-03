import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { getDoctorById } from '../../services/doctorApi';

export default function DoctorDetails() {
  const [doctor, setDoctor] = useState(null);
  const { doctorId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(doctorId, token);
        setDoctor(data);
      } catch (err) {
        console.error('Error fetching doctor:', err.message);
      }
    };

    if (doctorId) fetchDoctor();
  }, [doctorId, token]);

  if (!doctor) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-body-secondary">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  const remainingTokens = doctor.total_tokens - doctor.booked_tokens;

  return (
    <>
      <Header />

      <main className="bg-body-secondary py-5">
        <div className="container d-flex justify-content-center">
          <div className="card shadow col-10">
            <div className="card-body text-center">
              <h3 className="card-title mb-2">{doctor.name}</h3>
              <h5 className="text-secondary">{doctor.speciality}</h5>
              <p className="text-muted">Place: {doctor.place}</p>

              <h5 className="mt-4">Available Slots</h5>
              {doctor.availability_periods?.length > 0 ? (
                <ul className="list-group list-group-flush mb-3">
                  {doctor.availability_periods.map((slot, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{slot.start}</strong> &mdash; <strong>{slot.end}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No availability listed</p>
              )}

              <p className="fw-semibold mt-3">
                Remaining Tokens:{' '}
                <span className={`badge px-3 py-2 ${remainingTokens > 0 ? 'bg-success' : 'bg-danger'}`}>
                  {remainingTokens > 0 ? remainingTokens : 'Fully Booked'}
                </span>
              </p>

              <NavLink
                to={`/book-token/${doctorId}`}
                className={`btn btn-${remainingTokens > 0 ? 'primary' : 'secondary'} mt-3`}
                style={{ pointerEvents: remainingTokens > 0 ? 'auto' : 'none' }}
              >
                {remainingTokens > 0 ? 'Book Token' : 'Not Available'}
              </NavLink>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserBookings } from '../../services/bookingApi';

export default function UserBookingDetails() {
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserBookings(token);
      setBookings(data);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchBookings();
}, [token]);


  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="card-title mb-3">Your Booked Tokens</h4>
          <hr />

          {isLoading ? (
            <div className="text-center">Loading bookings...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : bookings.length > 0 ? (
            <div className="list-group">
              {bookings.map((booking) => (
                <div key={booking._id} className="list-group-item mb-3 rounded shadow-sm">
                  <h5 className="mb-1">Dr. {booking.doctorId.name}</h5>
                  <p className="mb-1 text-muted">Place: {booking.doctorId.place}</p>

                  <p className="fw-bold mb-2">
                    Date: {new Date(booking.slotTime).toLocaleDateString([], {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })} <br />
                    Time: {new Date(booking.slotTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  <div className="d-flex gap-2">
                    <NavLink className="btn btn-sm btn-warning" to={`/update-token/${booking._id}`}>
                      Update Token
                    </NavLink>
                    <NavLink className="btn btn-sm btn-danger" to={`/delete-token/${booking._id}`}>
                      Delete Token
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted">You have no booked tokens yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

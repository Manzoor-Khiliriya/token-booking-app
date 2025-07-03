import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { createBookingToken } from "../../services/bookingApi";
import Footer from "../footer/Footer";

export default function BookToken() {
  const { doctorId } = useParams();
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleBooking = async () => {
    if (!token) {
      alert("Please register yourself first.");
      navigate("/");
      return;
    }

    if (!slotTime) {
      alert("Please select a date and time.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createBookingToken(doctorId, token, slotTime);
      alert("Token booked successfully.");
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Error booking token.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-body-secondary py-5">
        <div className="container d-flex justify-content-center">
          <div className="card shadow-lg col-10 col-md-6 p-4">
            <div className="card-body text-center">
              <h3 className="card-title mb-3">Book Token for Doctor</h3>

              <div className="mb-3 text-start">
                <label htmlFor="slotTime" className="form-label fw-semibold">
                  Select Date & Time
                </label>
                <input
                  id="slotTime"
                  className="form-control"
                  type="datetime-local"
                  value={slotTime}
                  onChange={(e) => {
                    setSlotTime(e.target.value);
                    setError(null);
                  }}
                  disabled={isLoading}
                />
              </div>

              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handleBooking}
                disabled={isLoading}
              >
                {isLoading ? "Booking..." : "Book Token"}
              </button>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { updateToken } from "../../services/bookingApi";

export default function UpdateToken() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async () => {
    if (!token) {
      setError("Please register yourself first.");
      navigate("/");
      return;
    }

    if (!slotTime) {
      setError("Please select a new slot time.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateToken(bookingId, token, slotTime);
      setSuccess("Token updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.message || "Error updating token. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="bg-body-secondary py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow border-0 w-100" style={{ maxWidth: "500px" }}>
          <div className="card-body text-center">
            <h3 className="card-title mb-4 text-primary">Update Booking Token</h3>

            <div className="mb-3 text-start">
              <label htmlFor="slotTime" className="form-label fw-semibold">
                Select New Date & Time
              </label>
              <input
                type="datetime-local"
                id="slotTime"
                className="form-control"
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
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Token"}
            </button>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

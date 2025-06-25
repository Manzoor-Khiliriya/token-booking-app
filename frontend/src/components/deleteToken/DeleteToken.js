import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { deleteToken } from "../../services/bookingApi";

export default function DeleteToken() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    if (!token) {
      setError("Please register yourself first.");
      navigate("/");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteToken(bookingId, token);
      setSuccess("Token deleted successfully!");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setError(err.message || "Error deleting token. Please try again later.");
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
            <h3 className="card-title mb-4 text-danger">Delete Booking Token</h3>
            <p className="mb-3 text-muted">Are you sure you want to delete this token?</p>

            <button
              className="btn btn-outline-danger w-100 mb-3"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Confirm Delete"}
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

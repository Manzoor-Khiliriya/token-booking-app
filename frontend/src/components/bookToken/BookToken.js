import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";

export default function BookToken() {
    const { doctorId } = useParams();
    const [slotTime, setSlotTime] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    async function bookToken() {

        if (!token) {
            alert("Please register yourself first");
            navigate('/');
            return;
        }

        if (!slotTime) {
            alert("Please select a date and time.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${doctorId}`, {
                method: 'POST',

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ slotTime }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Token booked successfully');
                setError(null);
                navigate('/profile');
            } else {
                setError(result.error || 'Error booking token');
            }
        } catch (error) {
            setError('Error booking token. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <Header />
        <div className="d-flex justify-content-center align-items-center bg-body-secondary 100vh">
            <div className="col-11 col-md-6 m-3 bg-light shadow text-center">
                <h1>Book Token for Doctor</h1>
                <div className="d-flex flex-column p-2">
                    <input
                        className="form-control mb-2"
                        type="datetime-local"
                        value={slotTime}
                        onChange={(e) => {
                            setSlotTime(e.target.value);
                            setError(null);
                        }}
                        disabled={isLoading}
                    />
                    <button className="btn btn-outline-primary mb-2" onClick={bookToken} disabled={isLoading}>
                        {isLoading ? 'Booking...' : 'Book Token'}
                    </button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            </div>
        </div>
        </>
    );
}

import React, { useEffect, useState } from 'react';

export default function UserBookingDetails() {
    const token = localStorage.getItem("token")
    const [bookings, setBookings] = useState([]);
  
  
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        setBookings(result.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
  
    useEffect(() => {
      fetchBookings();
    }, []);
  
  
    return (
        <div className='border border-3 rounded my-2  p-3 bg-light shadow'>
            <h5>Booked Tokens</h5>
            <hr />
            <ol>
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking._id}>
                            <h6>
                                Doctor: {booking.doctorId.name} <br />
                                Place: {booking.doctorId.place}
                            </h6>
                            <span className='fw-bold'>
                                Slot Time: {new Date(booking.slotTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <br />
                                Date: {new Date(booking.slotTime).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <hr />
                        </li>

                    ))
                ) : (
                    <h6>No token booked</h6>
                )}

            </ol>

        </div>
    )
}

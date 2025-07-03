import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/userApi';

export default function UserDetails() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile(token);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate, token]);

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const age = userData ? calculateAge(userData.date_of_birth) : null;

  return (
    <div className="container my-4">
      {userData ? (
        <div className="card shadow border-0">
          <div className="card-header text-white" style={{backgroundColor: 'darkblue'}}>
            <h5 className="mb-1">Name: {userData.username}</h5>
            <small>Phone Number: {userData.phone_number}</small>
          </div>

          <div className="card-body">
            <h5 className="mb-3">Medical Information</h5>
            <hr />
            <p><strong>Age:</strong> {`${age.years} Y ${age.months} M ${age.days} D`}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Place:</strong> {userData.place}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
    </div>
  );
}

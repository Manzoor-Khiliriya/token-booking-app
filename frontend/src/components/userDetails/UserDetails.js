import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserDetails() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setUserData(result.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();


        if (days < 0) {
            months -= 1;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        return { years, months, days };
    };


    if (userData) {
        var date = userData.date_of_birth;
    };

    const age = calculateAge(date)

    return (
        <div className="bg-light shadow">
            {userData ? (
                <div className="rounded my-2">
                    <div className='shadow rounded-top text-light p-2' style={{ backgroundColor: 'darkblue' }}>
                        <h5>Name: {userData.username}</h5>
                        <h6>Phone number: {userData.phone_number}</h6>
                    </div>

                    <div className='shadow rounded-bottom p-2'>
                        <h5>Medical info</h5>
                        <hr />
                        <h6>Age : {`${age.years} Y ${age.months} M ${age.days} D`}</h6>
                        <h6>Gender : {userData.gender}</h6>
                        <h6>Place : {userData.place}</h6>
                    </div>
                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
